class Activity < ApplicationRecord
  belongs_to :creator, class_name: "User"
  belongs_to :course, optional: true

  has_many :grade_activities, dependent: :destroy
  has_many :grades, through: :grade_activities
  has_many :student_activities, dependent: :destroy
  has_many :users, through: :student_activities

  enum classification: { tarefa: "tarefa", evento: "evento", prova: "prova" }
  enum status: { pendente: "pendente", ativo: "ativo", cancelado: "cancelado" }

  validates :title, presence: true
  validates :date, presence: true
  validates :classification, presence: true, inclusion: { in: classifications.keys }
  validates :status, presence: true, inclusion: { in: statuses.keys }

  # Método para verificar se a atividade é geral
  def geral?
    all_grades
  end
end
