import React ,{useState, useRef, useEffect} from 'react'
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartMore from "highcharts/highcharts-more";


var today = new Date(),
  // Utility functions
  dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined;

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
            title: 'Implementer',
            value: options.implementer || 'NA'
        }, {
            title: 'Reason for Revision',
            value: options['Reason for Revision'] || 'NA'
        }, {
            title: 'Specific Actions',
            value: options['Specific Actions'] || 'NA'
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
    

export default function TimelineChart(props) {
// let data= filterByValue(props.seriesData.data, props.quarter)
let localFilteredData =  props.seriesData.filter(l =>
      Object.entries(props.filters)
      .every(([k, v]) => !v.length || l[k] === v))
      
console.log("-----------------------------------------------------")
console.log(localFilteredData)

const allData = [];
localFilteredData.map(x=> allData.push({data: x.data}));// x.map(y => allData.push(y.Data)));

const [chartOptions, setChart] = useState({
    chart: {
        backgroundColor: "transparent",
        height: 10*allData.length +'%'
      },
    navigator: {
      enabled: true,
      liveRedraw: true,
      height: 100,
      series: {
        type: 'gantt',
        pointPlacement: 0,
        pointPadding: 0
      },
      yAxis: {
        min: 0,
        max: 3,
        reversed: true,
        categories: []
        },
      xAxis: {
        type: "datetime"
      }
    },
    rangeSelector: { enabled: true },
    scrollbar: { enabled: true, liveRedraw: true },
    plotOptions: {
        series: {
            pointWidth: 20
        }
    },
    series: allData,
    tooltip: {
      pointFormatter: customPointFormatter
      
    },
    title: {
        text: ''
    },
    xAxis: {
            currentDateIndicator: true,
            // min: today +6 * day,
            // max: today + 12 * day
        },
     
    yAxis: {
      type: "treegrid",
      uniqueNames: true,
      alternateGridColor: '#dfdfe047',
      tickColor: '#0000000',
    tickPixelInterval: 10,
    tickPosition: 'inside',
    grid: {
        cellHeight: 90
    }
    },
    
});

const chartComponent = useRef(null);
// useEffect(() => {
//     const chart = chartComponent.current.chart;
//   }, []);
    
    return (
        <div>
            <HighchartsReact
                constructorType="ganttChart"
                ref={chartComponent}
                highcharts={Highcharts}
                options={chartOptions}
                immutable={true} 
                allowChartUpdate="true"
                // callback= {chart => setChart}
                // callback={function(chart) {
                //     chart.renderer
                //       .label()
                //       .css()
                //       .attr()
                //       .add();
                //   }}
            />
        </div>
    )
}