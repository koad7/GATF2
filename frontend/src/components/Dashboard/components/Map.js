import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Import Highcharts
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";

import map from "@highcharts/map-collection/custom/world.geo";

import proj4 from "proj4";

import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MapTooltipCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardHeader
        title={props.name}
        subheader={`Number of project: ${props.project}`}/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Total budget:</b> {new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(props["budget"]*1000) } USD
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <b>Total In Kind:</b> {new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(props["inkind"]*1000)} USD
        </Typography>
      </CardContent>
    </>
  );
}



HighchartsMap(Highcharts);


if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
}

export default  function Map(props) {

  
    const mapOptions = {
      chart: {
          map: map,
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
      // borderColor: "#343a40",
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
        stickOnContact: true,
        stickyTracking:false,
        useHTML: true,
          positioner: function () {
            return { x: 0, y: 0 };
        },
        formatter: function(){
          return  renderToStaticMarkup(<MapTooltipCard name={this.point.name} budget={this.point.options['z']} project={this.point.options['Project']} inkind={this.point.options['In-kind Estimation']}/>)
        },
        style: {
          width: "500px",
        },
      },
    series: [{
      name: 'Countries',
      color: '#E0E0E0',
      borderWidth:0,
      borderColor: '#a8a8a8',
      // nullColor: '#a8a8a8',
      enableMouseTracking: false
  },{
      type: "mapbubble",
      joinBy: ["iso-a3", "code3"],
      data: props.mapData,
      minSize: 9,
      maxSize: 9
    }]
    }
  

    return (<div>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
        containerProps={{ style: { height: 'calc(100vh - 170px)' } }}
      />
    </div>);
  }