import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme,PowerCharts);

// Resolves charts dependancy
const colorCode={
  "0":{
      code:"#bdbdbd",
      minvalue: "-",
      maxvalue: "-",
      label: "Nil"
  },
  "1":{
          code:"#00833e",
          minvalue: "1",
          maxvalue: "1",
          label: "Really Low"
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

//Filtering function
function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}

export default function ProjectSituationChart({props, quarter}){
  // Sort ny quarter 
  props.sort((a, b) => (a.Quarter > b.Quarter) ? 1 : -1);

  const dataRows=[
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
      label: "Project Progress According to Alan"
    },
    {
      id: "CIA",
      label: "Covid Impact Assesment"
    }
  ]
  
  let details=filterByValue (props, quarter)
console.log(props)
  let dataSource ={};
  let localquarter;
if(details.length !== 0){
  localquarter=quarter;
  details.forEach(x => {
  try {
    dataSource = {
      colorrange: {
        gradient: "0",
        color: [
          colorCode['0'],
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
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Assessment']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Assessment']].label 
              },
              {
                rowid: "OPR",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Relevance']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Relevance']].label ,
              },
              {
                rowid: "OPASUM",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Assumptions']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Assumptions']].label 
              },
              {
                rowid: "OPPAP",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Progress According to Plan']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Progress According to Plan']].label 
              },
              {
                rowid: "CIA",
                columnid: localquarter,
                displayvalue: colorCode[x['Covid Impact Assesment']]['minvalue'] ? colorCode[x['Covid Impact Assesment']]['minvalue'] : "0",
                colorrangelabel: colorCode[x['Covid Impact Assesment']].label ? colorCode[x['Covid Impact Assesment']].label  : "0"
              }
            ]
        }
      ],
      columns: {
        column: [
         
          {
            id: localquarter,
            label: localquarter
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
            label: "Project Progress According to Plan"
          },
          {
            id: "CIA",
            label: "Covid Impact Assesment"
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
    dataSource={
      colorrange: {
        gradient: "0",
        color: [
          {
            code:"#949090",
            minvalue: "0",
            maxvalue: "0",
            label: ""
        },{
          code:"#949090",
            minvalue: "0",
            maxvalue: "0",
            label: ""
      }
        ]
      },
      dataset: [
        {
          data: [
            {
              rowid: "OPASSES",
              columnid: localquarter,
              displayvalue: "0",
              colorrangelabel: ''
            },
            {
              rowid: "OPR",
              columnid: localquarter,
              displayvalue: "0",
              colorrangelabel: ''
            },
            {
              rowid: "OPASUM",
              columnid: localquarter,
              displayvalue: "0",
              colorrangelabel: ''
            },
            {
              rowid: "OPPAP",
              columnid: localquarter,
              displayvalue: "0",
              colorrangelabel: ''
            },
            {
              rowid: "CIA",
              columnid: localquarter,
              displayvalue: "0",
              colorrangelabel: ''
            }
          ]
        }
      ],
      columns: {
        column: [
         
          {
            id: localquarter,
            label: localquarter
          }
        ]
      },
      rows: {
        row: dataRows
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
  }

  });
}else if(details.length === 0 && props.length !== 0){
  localquarter=props.at(-1).Quarter;
  [props.at(-1)].forEach(x => {
    try {
      dataSource = {
        colorrange: {
          gradient: "0",
          color: [
            colorCode['0'],
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
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Assessment']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Assessment']].label 
              },
              {
                rowid: "OPR",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Relevance']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Relevance']].label ,
              },
              {
                rowid: "OPASUM",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Assumptions']]['minvalue'] ,
                colorrangelabel: colorCode[x['Overall Project Assumptions']].label 
              },
              {
                rowid: "OPPAP",
                columnid: localquarter,
                displayvalue: colorCode[x['Overall Project Progress According to Plan']]['minvalue'],
                colorrangelabel: colorCode[x['Overall Project Progress According to Plan']].label 
              },
              {
                rowid: "CIA",
                columnid: localquarter,
                displayvalue: colorCode[x['Covid Impact Assesment']]['minvalue'] ? colorCode[x['Covid Impact Assesment']]['minvalue'] : "0",
                colorrangelabel: colorCode[x['Covid Impact Assesment']].label ? colorCode[x['Covid Impact Assesment']].label  : "0"
              }
            ]
          }
        ],
        columns: {
          column: [
           
            {
              id: localquarter,
              label: localquarter
            }
          ]
        },
        rows: {
          row: dataRows
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
      dataSource={
        colorrange: {
          gradient: "0",
          color: [
            {
              code:"#949090",
              minvalue: "0",
              maxvalue: "0",
              label: ""
          },{
            code:"#949090",
              minvalue: "0",
              maxvalue: "0",
              label: ""
        }
          ]
        },
        dataset: [
          {
            data: [
              {
                rowid: "OPASSES",
                columnid: localquarter,
                displayvalue: "0",
                colorrangelabel: ''
              },
              {
                rowid: "OPR",
                columnid: localquarter,
                displayvalue: "0",
                colorrangelabel: ''
              },
              {
                rowid: "OPASUM",
                columnid: localquarter,
                displayvalue: "0",
                colorrangelabel: ''
              },
              {
                rowid: "OPPAP",
                columnid: localquarter,
                displayvalue: "0",
                colorrangelabel: ''
              },
              {
                rowid: "CIA",
                columnid: localquarter,
                displayvalue: "0",
                colorrangelabel: ''
              }
            ]
          }
        ],
        columns: {
          column: [
           
            {
              id: localquarter,
              label: localquarter
            }
          ]
        },
        rows: {
          row: dataRows
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
    }
  
    });
}else{
  dataSource={
    colorrange: {
      gradient: "0",
      color: [{
          code:"#949090",
          minvalue: "0",
          maxvalue: "1",
          label: ""
        },{
        code:"#949090",
          minvalue: "2",
          maxvalue: "4",
          label: ""
      }]
    },
    dataset: [
      {
        data: [
          {
            rowid: "OPASSES",
            columnid: '',
            displayvalue: "0",
            colorrangelabel: ''
          },
          {
            rowid: "OPR",
            columnid: '',
            displayvalue: "0",
            colorrangelabel: ''
          },
          {
            rowid: "OPASUM",
            columnid: '',
            displayvalue: "0",
            colorrangelabel: ''
          },
          {
            rowid: "OPPAP",
            columnid: '',
            displayvalue: "0",
            colorrangelabel: ''
          },
          {
            rowid: "CIA",
            columnid: '',
            displayvalue: "0",
            colorrangelabel: ''
          }
        ]
      }
    ],
    columns: {
      column: [
       
        {
          id: '',
          label: ''
        }
      ]
    },
    rows: {
      row: dataRows
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
}

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
