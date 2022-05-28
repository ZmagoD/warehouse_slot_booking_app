class Slot < ApplicationRecord
  belongs_to :warehouse
  validates :end_time, :start_time, presence: true
  validate :validate_slot_uniqueness
  validate :validate_time_duration
  validate :validate_end_time

  private

  def validate_slot_uniqueness
    scoped_slots = warehouse.slots.where(
      start_time: start_time.all_day,
      end_time: end_time.all_day
    )

    scoped_slots.select(:start_time, :end_time).each do |slot|
      if slot.start_time == start_time ||
        slot.end_time == end_time ||
        start_time.between?(slot.start_time, slot.end_time) ||
        end_time.between?(slot.start_time, slot.end_time) ||
        slot.start_time.between?(start_time, end_time) ||
        slot.end_time.between?(start_time, end_time)
        errors.add(:warehouse, 'time slot is already taken')
      end
    end
  end

  def validate_time_duration
    if ((end_time - start_time) / 1.minute).to_i % 15 != 0
      errors.add(:base, 'must be in 15 minutes difference')
    end
  end

  def validate_end_time
    if start_time >= end_time
      errors.add(:end_time, 'must be after start time')
    end
  end
end
