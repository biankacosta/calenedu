class Course < ApplicationRecord
  has_many :activities, dependent: :nullify

  validates :name, presence: true, uniqueness: true
end
