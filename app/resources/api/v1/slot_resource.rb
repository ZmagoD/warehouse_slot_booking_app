module Api
  module V1
    class SlotResource < JSONAPI::Resource
      attributes :start_time, :end_time, :uuid
      has_one :warehouse

      filter :warehouse
    end
  end
end