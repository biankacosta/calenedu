class User < ApplicationRecord
  has_secure_password
  
  belongs_to :grade, optional: true
  has_many :student_activities, dependent: :destroy
  has_many :activities, through: :student_activities
  has_many :created_activities, class_name: "Activity", foreign_key: "creator_id"

  enum role: { admin: "admin", aluno: "aluno" }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :grade, presence: true, if: -> { aluno? }, on: :create
end
