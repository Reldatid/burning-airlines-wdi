class Plane < ApplicationRecord
  has_many :flights
  validates :name, :rows, :columns, :presence => true
end
