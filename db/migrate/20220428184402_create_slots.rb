class CreateSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :slots do |t|
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.string :uuid, null: false, index: true
      t.belongs_to :warehouse, null: false, foreign_key: true

      t.timestamps
    end
  end
end
