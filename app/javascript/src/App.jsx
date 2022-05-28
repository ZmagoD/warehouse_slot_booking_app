import React, {useState, useEffect, useCallback, Fragment} from 'react';
import ReactDOM from 'react-dom';
import ApiClient from "./lib/apiClient";

import WarehouseSelect from "./components/WarehouseSelect";
import WarehouseSlotRequestForm from "./components/WarehouseSlotRequestForm";
import SlotsList from "./components/SlotsList";

const App = () => {
  const [pickedWarehouse, setPickedWarehouse] = useState(null)
  const [pickedDuration, setPickedDuration] = useState(0)
  const [pickedDate, setPickedDate] = useState(0)
  const [warehouseOptions, setWarehouseOptions] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [showSlotOptions, setShowSlotOptions] = useState(false)

  const fetchWarehouseOptions = useCallback(() => {
    ApiClient.findAll('warehouses').then(({data}) => {
      setWarehouseOptions(data)
    })
  }, [])

  useEffect(() => {
    fetchWarehouseOptions()
  }, [fetchWarehouseOptions])

  const renderForm = () => {
    if (pickedWarehouse) {
      return <WarehouseSlotRequestForm warehouse={pickedWarehouse} setBookedSlots={setBookedSlots} setShowSlotOptions={setShowSlotOptions} setPickedDuration={setPickedDuration} setPickedDate={setPickedDate} />
    }
  }

  const renderSlots = () => {
    if (showSlotOptions) {
      return <SlotsList bookedSlots={bookedSlots} warehouse={pickedWarehouse} duration={pickedDuration} date={pickedDate} />
    }
  }

  return <Fragment>
    <WarehouseSelect options={warehouseOptions} onSelectCallback={setPickedWarehouse} />
    {renderForm()}
    {renderSlots()}
  </Fragment>
}
export default App;