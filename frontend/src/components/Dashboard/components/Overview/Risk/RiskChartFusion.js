import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme,PowerCharts);

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },chart: {
    padding: theme.spacing(2),
    textAlign: 'center',
    
  },
}));


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


export default function RiskChartFusion ({props}) {
  let initialData = props.data
  let out={data: ''}
  let dataSource={};
  let initial, selected, local;


  if(props.filterObj.Quarter){
    try{
      local = initialData.filter(item=> item.Project === props.filterObj.Project);
      
      initial = filterByValue(local[0].Risks, "Initial Risk")
      selected = filterByValue(local[0].Risks, props.filterObj.Quarter)
    }catch(error){
      out.data = props.data
    }
  }

 


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
            rowid: "CP",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Country political']].minvalue,
            colorrangelabel: colorCode[initial[0]['Country political']].label
          },
          {
            rowid: "CP",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Country political']].minvalue,
            colorrangelabel: colorCode[selected[0]['Country political']].label
          },
          {
            rowid: "PT",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Project technical']].minvalue,
            colorrangelabel: colorCode[initial[0]['Project technical']].label
          },
          {
            rowid: "PT",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Project technical']].minvalue,
            colorrangelabel: colorCode[selected[0]['Project technical']].label
          },
          {
            rowid: "PSS",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Private sector support']].minvalue,
            colorrangelabel: colorCode[initial[0]['Private sector support']].label
          },
          {
            rowid: "PSS",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Private sector support']].minvalue,
            colorrangelabel: colorCode[selected[0]['Private sector support']].label
          },
          {
            rowid: "GC",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Government commitment']].minvalue,
            colorrangelabel: colorCode[initial[0]['Government commitment']].label
          },
          {
            rowid: "GC",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Government commitment']].minvalue,
            colorrangelabel: colorCode[selected[0]['Government commitment']].label
          },
          {
            rowid: "PB",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Project budget']].minvalue,
            colorrangelabel: colorCode[initial[0]['Project budget']].label
          },
          {
            rowid: "PB",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Project budget']].minvalue,
            colorrangelabel: colorCode[selected[0]['Project budget']].label
          },
          {
            rowid: "PTL",
            columnid: "INITIAL",
            displayvalue: colorCode[initial[0]['Project timelines']].minvalue,
            colorrangelabel: colorCode[initial[0]['Project timelines']].label
          },
          {
            rowid: "PTL",
            columnid: "CURRENT",
            displayvalue: colorCode[selected[0]['Project timelines']].minvalue,
            colorrangelabel: colorCode[selected[0]['Project timelines']].label
          }
        ]
      }
    ],
    columns: {
      column: [
        {
          id: "INITIAL",
          label: "Initial"
        },
        {
          id: "CURRENT",
          label: `Current (${props.filterObj.Quarter})`
        }
      ]
    },
    rows: {
      row: [
        {
          id: "CP",
          label: "Country political"
        },
        {
          id: "PT",
          label: "Project technical"
        },
        {
          id: "PSS",
          label: "Private sector support"
        },
        {
          id: "GC",
          label: "Government commitment"
        },
        {
          id: "PB",
          label: "Project budget"
        },
        {
          id: "PTL",
          label: "Project timelines"
        }
      ]
    },
    chart: {
      theme: "fusion",
      showPlotBorder: "1",
      plotBorderThickness: "4",
      caption: "",
      subcaption: "",
      showBorder: "0",
      bgAlpha: "0",
      showvalues: "1",
      mapbycategory: "1",
      plottooltext:
        "$rowlabel: $displayvalue "
    }
  };
} catch (error) {
  dataSource={}
}
    return (
      <ReactFC
          type="heatmap"
          width="75%"
          height="20%"
          dataFormat="JSON"
          dataSource={dataSource}
        /> 
    );
}
