import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import ApiClient from "../lib/apiClient";

const today = new Date()
let minDate = new Date(today)
minDate.setDate(today.getDate() + 1)

const WarehouseSlotRequestForm = ({warehouse, setBookedSlots, setShowSlotOptions, setPickedDuration, setPickedDate}) => {
  const [date, setDate] = useState(minDate);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(duration)) {
      setError('Duration must be set!')
    } else if ((duration % 15) !== 0) {
      setError('Durration has to be set in 15 minutes steps!')
    } else if (duration <= 0) {
      setError('Durration has to be greater than zero!')
    } else if (date < minDate) {
      setError(`Date has to be greater of ${minDate}!`)
    } else {
      ApiClient.findAll('slots', {filter: { date: date, warehouse_id: warehouse.id }}, { include: 'warehouse'})
               .then(({data}) => {
                 setPickedDate(date)
                 setPickedDuration(duration)
                 setBookedSlots(data)
                 setShowSlotOptions(true)
                 setError('')
               })
    }
  }

  const showErrorAlert = () => {
    if(error.length > 0) {
      return <div className="alert alert-danger" role="alert">
        {error}
      </div>
    }
  }

  return <div className="row m-5">
    <div className="col-6 offset-3 bg-white p-5">
      <div className="mb-3">
        <h3>Check warehouse <strong>{warehouse.name}</strong> availability</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {showErrorAlert()}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <DatePicker className="form-control" minDate={minDate} selected={date} onChange={(date) => setDate(date)} />
          <div className="form-text">Pick the date you would like to schedule your time slot.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <div className="input-group">
            <input type="number" min={0} step={15} value={duration} onInput={({currentTarget}) => setDuration(parseInt(currentTarget.value))} className="form-control" aria-describedby="minAddon" />
            <span className="input-group-text" id="minAddon">min</span>
          </div>
          <div id="emailHelp" className="form-text">Pick the desired duration for your time slot.</div>
        </div>

        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  </div>
}
export default WarehouseSlotRequestForm;