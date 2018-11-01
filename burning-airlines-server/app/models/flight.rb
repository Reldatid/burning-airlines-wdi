class Flight < ApplicationRecord
  belongs_to :plane
  has_many :reservations

  validates :date, :destination, :origin, :plane_id, :presence => true
end
