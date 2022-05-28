import JsonApi from 'devour-client'

const RootPath = document.querySelector('meta[name="host"]').content;
const ApiClient = new JsonApi({ apiUrl: RootPath })

ApiClient.define('warehouse', {
  name: '',
  slots: {
    jsonApi: 'hasMany',
    type: 'slot'
  }
})

ApiClient.define('slot', {
  startTime: '',
  endTime: '',
  warehouseId: '',
  warehouse: {
    jsonApi: 'hasOne',
    type: 'warehouse'
  },
})

export default ApiClient;