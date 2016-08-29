import React from 'react';
import dates from './utils/dates';
import localizer from './localizer';
import { navigate } from './utils/constants';

import TimeGrid from './TimeGrid';

let Week = React.createClass({

  propTypes: TimeGrid.propTypes,

  getDefaultProps() {
    return TimeGrid.defaultProps
  },

  render() {
    let { date, showWeekends, eventOffset } = this.props
    let { start, end, endBusiness } = Week.range(date, this.props)

    const endProperty = showWeekends ? end : endBusiness;

    return (
      <TimeGrid {...this.props} start={start} end={endProperty} eventOffset={eventOffset}/>
    );
  }

});

Week.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week');

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date;
  }
}

Week.range = (date, { culture }) => {
  let firstOfWeek = localizer.startOfWeek(culture)
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)
  let endBusiness = dates.subtract(end, 2, 'day');

  return { start, end, endBusiness }
}


export default Week
