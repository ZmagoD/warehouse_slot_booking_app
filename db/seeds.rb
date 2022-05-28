3.times do |number|
  Warehouse.create! name: "Warehouse - (#{number})"
end

[{start: "2022-05-10T20:00:00.000Z", end: "2022-05-10T22:30:00.000Z" },
{start: "2022-05-11T23:00:00.000Z", end: "2022-05-11T06:00:00.000Z" },
{start: "2022-05-11T10:15:00.000Z", end: "2022-05-11T10:45:00.000Z" },
{start: "2022-05-12T13:55:00.000Z", end: "2022-05-12T14:30:00.000Z" },
{start: "2022-05-13T10:00:00.000Z", end: "2022-05-14T15:00:00.000Z" },
{start: "2022-05-15T09:00:00.000Z", end: "2022-05-15T10:00:00.000Z" },
{start: "2022-05-15T11:30:00.000Z", end: "2022-05-15T13:00:00.000Z" },
{start: "2022-05-15T13:00:00.000Z", end: "2022-05-15T13:10:00.000Z" }].each do |slot_time|
  Slot.create! start_time: slot_time[:start].to_time, end_time: slot_time[:end].to_time, warehouse: Warehouse.first
end