import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/custom/world.geo.json";

highchartsMap(Highcharts);


if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }



  const mapOptions = {
    chart: {
        map: 'custom/world',
        borderWidth: 0
    },
    title: {
      text: 'Projects map'
    },
    credits: {
        enabled: false
    },
    mapNavigation: {
      enabled: true
    },
tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.freq}</b><br><b>{point.keyword}</b> <br>lat: {point.lat}, lon: {point.lon}'
    },
    series: [{
      // Use the gb-all map with no data as a basemap
      name: 'Basemap',
      mapData: mapDataIE,
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
  
  