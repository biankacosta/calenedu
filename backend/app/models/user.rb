class User < ApplicationRecord
  has_secure_password
  
  belongs_to :grade, optional: true
  has_many :activities, foreign_key: :creator_id, dependent: :destroy

  enum role: { admin: "admin", aluno: "aluno" }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :grade, presence: true, if: -> { aluno? }, on: :create
end
