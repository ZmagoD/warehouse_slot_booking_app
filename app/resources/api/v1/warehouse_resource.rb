module Api
  module V1
    class WarehouseResource < JSONAPI::Resource
      attributes :name
      has_many :slots, acts_as_set: true, exclude_links: :default
    end
  end
end