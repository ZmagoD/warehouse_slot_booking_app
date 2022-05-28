import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Slot from './Slot'

const SlotList = ({bookedSlots, warehouse, date, duration}) => {
  const prepareOptions = () => {
    let startHour = moment(date).set({hours: 0, minutes: 0, seconds: 0}); // Hour when warehouse opens
    let endHour = moment(date).set({hours: 24, minutes: 0, seconds: 0}) // Hour when warehouse closes
    let slotOptions = []

    while (startHour < endHour) {
      let time = startHour.clone()
      slotOptions.push(time);
      startHour = startHour.add(duration, 'minutes');
    }
    return slotOptions;
  }

  const isSlotTaken = (time) => {
    let isTaken = false;
    bookedSlots.forEach((slot)=> {
      let slotStartTime = moment.utc(slot.startTime)
      let startTime = time.clone()
      let slotEndTime = moment.utc(slot.endTime)
      let endTime = time.clone()
      endTime.add(duration, 'minutes')
      if (startTime.isBetween(slotStartTime, slotEndTime) ||
          endTime.isBetween(slotStartTime, slotEndTime) ||
          startTime.isSame(slotStartTime) ||
          endTime.isSame(slotEndTime)) {
        isTaken = true
      }
    })

    return isTaken
  }

  const renderSlots = () => {
    let options = prepareOptions();
    let items = options.map((time) => {
      if (isSlotTaken(time)) {
        return <Slot key={time.toString()}
                     time={time}
                     duration={duration}
                     available={false}
                     warehouse={warehouse} />
      } else {
        return <Slot key={time.toString()}
                     available={true}
                     time={time}
                     duration={duration}
                     warehouse={warehouse} />
      }
    })
    return items;
  }

  const pickedDate = () => {
    return moment(date).format("MMM Do YYYY")
  }
  return <div className="row m-5">
    <div className="col-6 offset-3 bg-white p-5">
      <div className="mb-3">
        <h3>Select available slot for {pickedDate()}</h3>
      </div>
      <div className="mb-3">
        <ul className="list-group">
          {renderSlots()}
        </ul>
      </div>
    </div>
  </div>
}
export default SlotList;