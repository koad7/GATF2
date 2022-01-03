# coding: utf-8
import concurrent.futures
import os
import airtable
import pandas as pd
from slugify import slugify
import datetime as dt
import numpy as np
import countrynames

APIKEY = os.getenv('AIRTABLEAPIKEY')
TABLEKEY = os.getenv('TABLEKEY')


def airtable_func():
    table_dict = {
        'Risks': '',
        'Project: Next steps': '',
        'Timeline': '',
        'Finance': '',
        'Project: General Information': '',
        'Project: Details': '',
        'Milestones': ''
    }

    def build_final_ouput(objDict, mainInformationTable):
        '''
        Parameters:
        -----------
        objDict: dictionary with the other tables (Risks, Timeline, Finance, Milestones ...) data
        mainInformationTable: Main project information table from Airtable
        Returns:
        --------
        mainInformationTable: Completed Projects information table with all the other tablesdata
        '''
        # Building project objects
        for project in mainInformationTable:
            for key, value in objDict.items():
                mainInformationTable[project][0][key] = ''
                try:
                    objDict[key][project]
                    mainInformationTable[project][0][key] = objDict[key][
                        project]
                except:
                    mainInformationTable[project][0][key] = []
        return mainInformationTable

    def get_data(table):
        '''
        Parameters:
        ----------
        table: Name of the table to get data from in Airtable.
        Return:
        -------
        json data from Airtable table.
        '''
        return pd.json_normalize(
            airtable.Airtable(TABLEKEY, table,
                              APIKEY).get_all(view='Grid View'))

    # We can use a with statement to ensure threads are cleaned up promptly
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        # Start the load operations and mark each future with its table_dict
        future_to_table = {
            executor.submit(get_data, table): table
            for table in table_dict
        }
        for future in concurrent.futures.as_completed(future_to_table):
            table = future_to_table[future]
            try:
                table_dict[table] = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (table, exc))
            else:
                pass

    # Get all tables data
    information_df = table_dict['Project: General Information'].fillna('')
    details_df = table_dict['Project: Details'].fillna('')
    nextsteps_df = table_dict['Project: Next steps'].fillna('')
    finance_df = table_dict['Finance'].fillna('')
    risks_df = table_dict['Risks'].fillna('')
    timeline_df = table_dict['Timeline'].fillna('')
    milestones_df = table_dict['Milestones'].fillna('')
    # Insert column if doest exist, Avoid not having column in dataset
    details_cols = [
        'fields.Overall Project Relevance', 'fields.Quarter',
        'fields.Overall Project Assessment',
        'fields.Overall Project Progress According to Plan',
        'fields.Covid Impact Assesment', 'fields.Overall Project Assumptions',
        'fields.Project'
    ]
    details_df = details_df.reindex(details_df.columns.union(details_cols,
                                                             sort=False),
                                    axis=1,
                                    fill_value="0")

    # Project: General Information
    # Field names tidying up
    for field in information_df.columns:
        if (len(field.split(".")) == 2):
            information_df.rename(columns={field: field.split(".")[1]},
                                  inplace=True)
    # Keep only the last entry of eac project
    information_df = information_df.sort_values(
        ['Project', 'createdTime']).drop_duplicates(subset=['Project'],
                                                    keep='last')
    # Select field of interest
    information_df_f = information_df[[
        'id', 'Other private sector support', 'Agreement',
        'Lead government agency', 'To be monitored',
        'Last month project progress and activities', 'Scope',
        'Project Budget', 'Expected Result', 'Project Type', 'TFA Articles',
        'Status', 'Private sector champions', 'Assumptions', 'Implementer',
        'Project', 'Country-Region', 'Quarter', 'Overall Outlook',
        'In-kind Estimation'
    ]]
    # Split columns 'Country-Region' to 'Country' and 'Region'
    information_df_f[['Country', 'Region'
                      ]] = information_df_f['Country-Region'].str.split(
                          " - ", expand=True).rename(columns={
                              0: 'Country',
                              1: 'Region'
                          })
    information_df_f = information_df_f.drop(columns=['Country-Region'])
    information_df_f["id"] = information_df_f.index  # Create a numerical id

    # Final information dict building
    INFORMATION = information_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    # Project: Details
    # Field names tidying up
    for field in details_df.columns:
        if (len(field.split(".")) == 2):
            details_df.rename(columns={field: field.split(".")[1]},
                              inplace=True)

    details_df_f = details_df[[
        'Overall Project Relevance', 'Quarter', 'Overall Project Assessment',
        'Overall Project Progress According to Plan', 'Covid Impact Assesment',
        'Overall Project Assumptions', 'Project'
    ]]

    details_df_f.loc[:, 'Project'] = details_df_f['Project'].apply(
        lambda x: x.split('_')[0].strip())
    Details = details_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    #Project: Next steps
    for field in nextsteps_df.columns:
        if (len(field.split(".")) == 2):
            nextsteps_df.rename(columns={field: field.split(".")[1]},
                                inplace=True)

    nextsteps_df_f = nextsteps_df[[
        'id', 'Deadline', 'Next step', 'Status', 'Quarter', 'Project'
    ]]
    # Filter out Completed and Cancelled
    nextsteps_df_f = nextsteps_df_f.drop(
        nextsteps_df_f[nextsteps_df_f.Status == "Cancelled"].index)
    nextsteps_df_f = nextsteps_df_f.drop(
        nextsteps_df_f[nextsteps_df_f.Status == "Completed"].index)

    nextsteps_df_f.loc[:, 'Project'] = nextsteps_df_f['Project'].apply(
        lambda x: x.split('_')[0].strip())
    nextsteps_df_f.drop('id', axis='columns', inplace=True)
    NextSteps = nextsteps_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    #Finance
    for field in finance_df.columns:
        if (len(field.split(".")) == 2):
            finance_df.rename(columns={field: field.split(".")[1]},
                              inplace=True)

    finance_df_f = finance_df[[
        'id',
        'In-kind - Contributed',
        # 'In-kind - Estimated',
        'Project - Consumed',
        'Quarter',
        'Name'
    ]]
    finance_df_f.loc[:, 'Project'] = finance_df_f['Name'].apply(
        lambda x: x.split('_')[0].strip())
    finance_df_f.drop(['Name', 'id'], axis='columns', inplace=True)
    Finance = finance_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    #Risks
    for field in risks_df.columns:
        if (len(field.split(".")) == 2):
            risks_df.rename(columns={field: field.split(".")[1]}, inplace=True)
    risks_df_f = risks_df[[
        'id',
        'Government commitment',
        'Project technical',
        'Date',
        'Project timelines',
        'Stage',
        'Quarter',
        'Private sector support',
        'Project budget',
        'Country political',
        'Project Name',
    ]]

    risks_df_f.loc[:, 'Project'] = risks_df_f['Project Name'].apply(
        lambda x: x.split('_')[0].strip())
    risks_df_f.drop(['id', 'Project Name'], axis='columns', inplace=True)
    Risks = risks_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    # Timeline
    for field in timeline_df.columns:
        if (len(field.split(".")) == 2):
            timeline_df.rename(columns={field: field.split(".")[1]},
                               inplace=True)
    timeline_df_f = timeline_df[[
        'id', 'Quarter', 'Phase name', 'Phase', 'Project phase'
    ]]

    timeline_df_f.loc[:, 'Project'] = timeline_df_f['Project phase'].apply(
        lambda x: x.split('|')[0].strip())

    timeline_df_f.drop(['id', 'Project phase'], axis='columns', inplace=True)
    Timeline = timeline_df_f.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    # Milestones
    for field in milestones_df.columns:
        if (len(field.split(".")) == 2):
            milestones_df.rename(columns={field: field.split(".")[1]},
                                 inplace=True)
    milestones_df_f = milestones_df[[
        'id', 'Milestone number', 'Planned date', 'Revised date',
        'Specific Actions(if any)', 'Reason for revision', 'Quarter',
        'Milestone name', 'Milestones', 'Status'
    ]]
    # Timeline Milestones chart
    # Get project name, Phase, and Milestone names
    try:
        milestones_df_f[[
            'Project', 'Phase', 'Phase name', 'Milestone number',
            'Milestone name_'
        ]] = milestones_df_f['Milestones'].str.split(
            "|", n=5, expand=True).apply(lambda x: [e.strip() for e in x])
    except:
        pass
    milestones_df_f.drop('Milestone name_', axis=1, inplace=True)

    ## Merging back milestones and phases
    milestones_df_merge = milestones_df_f
    milestones_df_merge.drop(['id', 'Milestones'],
                             axis='columns',
                             inplace=True)
    milestones_df_merge['parent'] = milestones_df_merge[[
        'Project', 'Phase name', 'Phase'
    ]].apply(lambda x: slugify('_'.join(x), separator="_"), axis=1)
    # Take "Planned date" or "Revised date"
    milestones_df_merge['planned_date'] = milestones_df_merge['Planned date']
    milestones_df_merge['start'] = pd.to_datetime(
        np.where(milestones_df_merge["Revised date"] != '',
                 milestones_df_merge["Revised date"],
                 milestones_df_merge["Planned date"]))
    #milestones_df_merge['start'] = pd.to_datetime(milestones_df_merge['start'])
    milestones_df_merge['start'] = (milestones_df_merge['start'] - dt.datetime(
        1970, 1, 1)).dt.total_seconds() * 1e3

    milestones_df_merge[
        'milestone'] = True  # Adding new variables for the chart to use
    milestones_df_merge['collapsed'] = True

    milestones_df_merge = milestones_df_merge.fillna('')

    milestones_df_merge_ = milestones_df_merge.drop(
        columns=['Planned date']).rename(
            columns={
                'Milestone name': 'name',
                'Specific Actions(if any)': 'Specific Actions'
            })
    milestones_df_merge_.name = 'Milestone ' + milestones_df_merge_[
        'Milestone number'].astype(
            str) + ': - ' + milestones_df_merge_.name.astype(str)
    pd.options.display.float_format = '{:.0f}'.format

    Milestones = milestones_df_merge_.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()

    # Timleine Project objects
    Project_timeline_ = information_df_f[[
        'Project', 'Implementer'
    ]].rename(columns={
        'Project': 'name',
        'Implementer': 'implementer'
    })
    Project_timeline_.loc[:, 'id'] = Project_timeline_.name.apply(
        lambda x: slugify(x, separator="_"))
    Project_timeline_.loc[:, 'collapsed'] = True
    Project_timeline = Project_timeline_.groupby('name').apply(
        lambda x: x.to_dict(orient='records')).to_dict()
    # Timleine Phase objects
    Phase_timeline_ = timeline_df_f.rename(columns={'Phase name': 'name'})
    Phase_timeline_.loc[:, 'collapsed'] = True
    Phase_timeline_.loc[:, 'id'] = Phase_timeline_[[
        'Project', 'name', 'Phase'
    ]].apply(lambda x: slugify('_'.join(x), separator="_"), axis=1)
    Phase_timeline_.loc[:, 'parent'] = Phase_timeline_.Project.apply(
        lambda x: slugify(x, separator="_"))
    Phase_timeline = Phase_timeline_.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()
    # Select only latest
    # Tidy up for Timeline chart
    milestones_df_merge_2 = milestones_df_merge_[
        milestones_df_merge_.sort_values(
            by='Quarter', ascending=True).duplicated(
                subset=['name', 'Project', 'Phase', 'Milestone number'],
                keep='first')]
    intermediary = milestones_df_merge_.drop_duplicates(
        ['name', 'Project', 'Phase', 'Milestone number'],
        keep=False,
        ignore_index=True)
    final_milestones = pd.concat([milestones_df_merge_2, intermediary])
    # Convert to numeric
    final_milestones['Milestone number'] = pd.to_numeric(
        final_milestones['Milestone number'], errors='coerce')
    final_milestones['Phase'] = pd.to_numeric(final_milestones['Phase'],
                                              errors='coerce')
    final_milestones = final_milestones.sort_values(
        by=['Project', 'Phase', 'Milestone number'])
    Milestones2 = final_milestones.groupby('Project').apply(
        lambda x: x.to_dict(orient='records')).to_dict()
    # Merging all project timeline informations by project
    for p in [Project_timeline]:
        for key in p:
            try:
                Project_timeline[key] = Project_timeline[key] + Phase_timeline[
                    key] + Milestones2[key]
            except (KeyError, TypeError) as e:
                Project_timeline[key] = ''

    information_df_f['hc-key'] = information_df_f.Country.apply(
        lambda x: countrynames.to_code(x).lower())
    MapData = information_df_f.groupby(['hc-key']).sum()[[
        'Project Budget', 'In-kind Estimation'
    ]].merge(information_df_f.groupby(['hc-key'])['Project'].count(),
             left_on='hc-key',
             right_on='hc-key').reset_index().rename(columns={'Project Budget':'value'}).to_dict(orient="records")
    print(
        "------------------------------------------------------------------------------------------------"
    )

    OBJ_DICT = {
        "Details": Details,
        "NextSteps": NextSteps,
        "Finance": Finance,
        "Risks": Risks,
        "data": Project_timeline,
        "Milestones": Milestones
    }
    # Return final data from airtable
    fJson_ = build_final_ouput(OBJ_DICT, INFORMATION)
    finalJson = []
    for key in fJson_:
        finalJson.append(fJson_[key][0])
    print(finalJson)
    return {'data': finalJson, 'mapdata': MapData}
