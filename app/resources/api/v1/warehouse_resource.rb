module Api
  module V1
    class WarehouseResource < JSONAPI::Resource
      attributes :name
      has_many :slots
    end
  end
end