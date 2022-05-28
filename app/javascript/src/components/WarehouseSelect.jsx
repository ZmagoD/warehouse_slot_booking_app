import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select'

const WarehouseSelect = ({options, onSelectCallback}) => {
  const parsedOptions = (options) => {
    return options.map(({name, id}) => {
      return { label: name, value: id };
    })
  }

  const findSelected = ({value}) => {
    return options.find((warehouse) => warehouse.id === value)
  }

  return <div className="row m-5">
    <div className="col-6 offset-3 bg-white p-5">
      <div className="mb-3">
        <h3>Select warehouse which you want to book from</h3>
      </div>
      <div className="mb-3">
        <Select options={parsedOptions(options)} onChange={(value) => onSelectCallback(findSelected(value)) } />
      </div>
    </div>
  </div>
}
export default WarehouseSelect;