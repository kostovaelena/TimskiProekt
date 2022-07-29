import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

export default function SliderTooltip(props) {
  const useStyles = makeStyles({
    label: {
        zIndex: 1,
        backgroundColor: "rgba(40,40,40,0.75)"
      }
  
  });
    const classes = useStyles();
    const { children, value } = props;
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date()
    date.setHours(value);
    let dateString = moment(date).format("DD.MMM. HH:00");
    // if(value < 24) dateString = weekday[date.getDay()] + ' - ' + date.getDate() + ' ' + value + ':00';
    // else if(value < 48) {
    //     date.setDate(date.getDate() + 1)
    //     dateString = weekday[date.getDay()] + ' - ' + date.getDate().get + ' ' + (value - 24) + ':00';
    // }
    // else if(value < 72){
    //     date.setDate(date.getDate() + 2)
    //     dateString = weekday[date.getDay()] + ' - ' + date.getDate() + ' ' + (value - 48) + ':00';
    // }
    // else{
    //     date.setDate(date.getDate() + 3)
    //     dateString = weekday[date.getDay()] + ' - ' + date.getDate() + ' ' + (value - 72) + ':00';
    // }
    const popperRef = React.useRef(null);
    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.update();
      }
    });
    return (
        
      <Tooltip
      classes={{
          tooltip: classes.label
      }}
        PopperProps={{
          popperRef,
        }}
        open={true}
        enterTouchDelay={0}
        placement="top"
        title={dateString}
      >
        {children}
      </Tooltip>
    );
  }
  
  SliderTooltip.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };