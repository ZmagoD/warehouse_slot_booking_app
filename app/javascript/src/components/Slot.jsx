import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import ApiClient from "../lib/apiClient";

const Slot = ({time, available, duration, warehouse}) => {
  const bookSlot = (ev) => {
    ev.preventDefault()

    let startTime = moment(time).utc().format()
    let endTime = moment(time.add(duration, 'minutes')).utc().format()
    ApiClient.create('slot', {
      startTime: startTime,
      endTime: endTime,
      warehouseId: warehouse.id
    }).then(() => {
        window.alert('Your slot is booked')
        window.location.reload()
    })
  }

  const bookSlotCTA = () => {
    if (available) {
      return <button className="btn btn-primary" onClick={bookSlot}>Book slot</button>
    }
  }

  const fromToLabel = () => {
    let labeledTime = time.clone();
    return `From ${labeledTime.format('HH:mm')} to ${labeledTime.add(duration, 'minutes').format('HH:mm')}`
  }

  return <li className={`list-group-item ${available ? 'bg-success' : 'bg-danger' }`}>
    <div className="row">
      <div className="col-9">
        <strong>Slot</strong>
        <br />
        <em>{fromToLabel()}</em>
      </div>
      <div className="col-3">
        {bookSlotCTA()}
      </div>
    </div>
  </li>
}
export default Slot;