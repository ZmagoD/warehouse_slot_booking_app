module Api
  module V1
    class SlotResource < JSONAPI::Resource
      attributes :start_time, :end_time, :warehouse_id
      has_one :warehouse

      filter :warehouse_id, apply: ->(records, value, _options) do
        id = value.first
        records.where(warehouse_id: id)
      end

      filter :date, apply: ->(records, value, _options) do
        date = value.first.to_date
        start_day = (date - 1.day).beginning_of_day
        end_day = (date + 1.day).end_of_day

        records.where(
          start_time: start_day..end_day,
          end_time: start_day..end_day
        )
      end
    end
  end
end