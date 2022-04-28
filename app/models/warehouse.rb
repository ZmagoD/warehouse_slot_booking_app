class Warehouse < ApplicationRecord
  has_many :slots, dependent: :destroy
end
