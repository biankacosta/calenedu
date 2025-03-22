class Grade < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :grade_activities, dependent: :destroy
  has_many :activities, through: :grade_activities

  validates :name, presence: true, uniqueness: true
end
