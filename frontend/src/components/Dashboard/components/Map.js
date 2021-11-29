import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";

highchartsMap(Highcharts);

const mapDataIE = require('@highcharts/map-collection/custom/world.geo.json');

if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }

  const mapOptions = {
    chart: {
        map: mapDataIE,
        borderWidth: 0
    },
    title: {
      text: ''
    },
    credits: {
        enabled: false
    },
    legend:{
      enabled: false
    },
    borderColor: "#343a40",
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      buttonOptions: {
          theme: {
              fill: '#eead2200',
              'stroke-width': 0,
              stroke: '#eead2200',
              r: 0,
              states: {
                  hover: {
                      fill: '#eead2200'
                  },
                  select: {
                      stroke: '#eead2200',
                      fill: '#eead2200'
                  }
              }
          },
          verticalAlign: 'bottom'
      },
      buttons:{
        zoomIn: {
          text: ""
        },
        zoomOut: {
          text: ""
        }
      }
    },

    tooltip: {
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      footerFormat:
        '<span style="font-size: .750em">(Click for details)</span>',
      padding: 0,
      headerFormat: '<b style="font-size:1.50em">{point.key}</b><br/>',
      pointFormat: '<span style="font-size:1em"></span>',
      style: {
        width: "500px",
      },
    },

    series: [{
      // Use the gb-all map with no data as a basemap
      name: 'Basemap',
      data: [["in", 5], ["au", 10], ["us", 97]],
      borderColor: '#A0A0A0',
      nullColor: 'rgba(200, 200, 200, 0.3)',
      showInLegend: false
    }, {
      // Specify points using lat/lon
      type: 'mapbubble',
      name: 'Cities',
      color: '#4169E1',
      data: '',
      cursor: 'pointer',
      point: {
        events: {
          click: function() {
            console.log("rerere")
          }
        }
      }
    }]
  }

export default  function Map() {
    return (<div>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
        containerProps={{ style: { height: 'calc(100vh - 170px)' } }}
      />
    </div>);
  }
  
  