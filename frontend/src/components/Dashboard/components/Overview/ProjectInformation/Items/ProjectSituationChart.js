import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme,PowerCharts);

// Resolves charts dependancy
const colorCode={
  "1":{
          code:"#00833e",
          minvalue: "1",
          maxvalue: "1",
          label: "Nil"
        },
      
    "2":{
          code: "#a2d45e",
          minvalue: "2",
          maxvalue: "2",
          label: "Low"
        },
    "3":{
          code: "#ffe76a",
          minvalue: "3",
          maxvalue: "3",
          label: "Medium"
        },
    "4":{
      code: "#ff8300",
      minvalue: "4",
      maxvalue: "4",
      label: "High"
    },
    "5":{
      code: "#e84545",
      minvalue: "5",
      maxvalue: "5",
      label: "Critical"
    }
}

function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}

export default function ProjectSituationChart({props, quarter}){
  let dataSource ={}

props.forEach(x => {
    try {
      dataSource = {
        colorrange: {
          gradient: "0",
          color: [
            colorCode['1'],
            colorCode['2'],
            colorCode['3'],
            colorCode['4'],
            colorCode['5']
          ]
        },
        dataset: [
          {
            data: [
              {
                rowid: "OPASSES",
                columnid: quarter,
                displayvalue: colorCode[x['Overall Project Assessment']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Assessment']].label
              },
              {
                rowid: "OPR",
                columnid: quarter,
                displayvalue: colorCode[x['Overall Project Relevance']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Relevance']].label
              },
              {
                rowid: "OPASUM",
                columnid: quarter,
                displayvalue: colorCode[x['Overall Project Assumptions']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Assumptions']].label
              },
              {
                rowid: "OPPAP",
                columnid: quarter,
                displayvalue: colorCode[x['Overall Project Progress According to Plan']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Progress According to Plan']].label
              }
            ]
          }
        ],
        columns: {
          column: [
           
            {
              id: quarter,
              label: quarter
            }
          ]
        },
        rows: {
          row: [
            {
              id: "OPASSES",
              label: "Project Assessement"
            },
            {
              id: "OPR",
              label: "Project Relevance"
            },
            {
              id: "OPASUM",
              label: "Project Assumption"
            },
            {
              id: "OPPAP",
              label: "project progress according to plan"
            }
          ]
        },
        chart: {
          theme: "fusion",
          caption: "",
          subcaption: "",
          plotBorderThickness: "4",
          showvalues: "1",
          mapbycategory: "1",
          showLegend: "0",
          plottooltext:
            "$rowlabel: $displayvalue "
        }
      }
    }catch(error){
      dataSource={}
    }
  
  // quarter.push(x['Quarter'])
  
})

    return (
      <ReactFC
        type="heatmap"
        width="75%"
        height="40%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );

}
