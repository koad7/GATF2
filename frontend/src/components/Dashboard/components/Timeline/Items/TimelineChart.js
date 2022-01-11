import React , {useState, useEffect} from 'react'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartMore from "highcharts/highcharts-more";


var dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined;
// Date 
var today = new Date();
  // day = 1000 * 60 * 60 * 24,
  // Utility functions
  // isObject = Highcharts.isObject;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

HighchartMore(Highcharts);

var customPointFormatter = function () {
var point = this,
            format = '%e. %b',
            options = point.options,lines;

        lines = [{
            value: point.name,
            style: 'font-weight: bold;'
        }, {
            title: 'Start',
            value: dateFormat(format, point.start)
        }, {
            visible: !options.milestone,
            title: 'End',
            value: dateFormat(format, point.end)
        }, {
            title: options.implementer ? 'Implementer' :'',
            value: options.implementer || ''
        }, {
            title: options['Reason for Revision'] ? 'Reason for Revision' : '',
            value: options['Reason for Revision'] || ''
        }, {
            title: options['Specific Actions'] ? 'Specific Actions' : '',
            value: options['Specific Actions'] || ''
        }];

        return lines.reduce(function (str, line) {
            var s = '',
                style = (
                    defined(line.style) ? line.style : 'font-size: 0.8em;'
                );
            if (line.visible !== false) {
                s = (
                    '<span style="' + style + '">' +
                    (defined(line.title) ? line.title + ': ' : '') +
                    (defined(line.value) ? line.value : '') +
                    '</span><br/>'
                );
            }
            return str + s;
        }, '');
    }
    
const generateOptions = (data) =>{
 return {
    chart: {
        backgroundColor: "transparent",
        // height: 10*data.length +'%'
    },
    credits: {
      enabled: false
  },
  navigator: {
    enabled: false,
    liveRedraw: true,
    series: {
      type: 'gantt',
      pointPlacement: .005,
      pointPadding: .003
    },
    yAxis: {
      min: 1,
      max: 25,
      reversed: false,
      categories: []
    }
  },
  scrollbar: {
    enabled: true
  },
  rangeSelector: {
    enabled: true,
    selected: 0
  },
    plotOptions: {
        series: {
          point: {
            events: {
              click: function () {
                // Modal creation
              },
            },
          },
        },
      },
    series: data,
    tooltip: {
    pointFormatter: customPointFormatter
    
    },
    title: {
        text: ''
    },
    xAxis: {
            currentDateIndicator: true,
            // min: today - 30 * day,
            // max: today + 15 * day
        },
    
    yAxis: {
        type: "treegrid",
        // uniqueNames: true,
        alternateGridColor: '#dfdfe047',
        tickColor: '#0000000',
        tickPixelInterval: 30,
        tickPosition: 'inside',
        gridLineColor:'#e9e9e9',
        grid: {
            enabled: true,
            borderColor: 'rgba(0,0,0,0.3)',
            borderWidth: .5,
        },
    },
    
}
}
export default function TimelineChart(props) {
    const [chartOptions, setChartOptions] = useState();
    
    useEffect(() => {
        setChartOptions(generateOptions(props.seriesData));
      }, [props.seriesData]);
   
    
    return (
        <div>
            {chartOptions?
            <HighchartsReact
            constructorType="ganttChart"
            highcharts={Highcharts}
            options={chartOptions}
            immutable={true} 
            allowChartUpdate="true"
            callback= {chart => setChartOptions}
        />:''}
        </div>
    )
}