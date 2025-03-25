class Activity < ApplicationRecord
  belongs_to :creator, class_name: "User"
  belongs_to :course, optional: true

  has_many :grade_activities, dependent: :destroy
  has_many :grades, through: :grade_activities
  has_many :student_activities, dependent: :destroy
  has_many :users, through: :student_activities, source: :user

  enum classification: { tarefa: "tarefa", evento: "evento", prova: "prova" }
  enum status: { pendente: "pendente", ativo: "ativo", cancelado: "cancelado" }

  validates :title, presence: true
  validates :date, presence: true
  validates :classification, presence: true, inclusion: { in: classifications.keys }
  validates :status, presence: true, inclusion: { in: statuses.keys }

  before_validation :student_activity_classification_tarefa, on: :create
  before_save :set_default_time


  # Método para verificar se a atividade é geral
  def geral?
    all_grades
  end

  # Scope para filtrar por intervalo de datas
  scope :within_date_range, ->(start_date, end_date) { 
    where(date: start_date..end_date) 
  }

  # Escopos para consultas
  scope :for_student, ->(user) {
    left_joins(:grade_activities)
      .where("(classification IN ('prova', 'evento', 'tarefa') AND ((creator_id = :user_id) OR
            (creator_id != :user_id AND (all_grades = true OR grade_activities.grade_id = :grade_id))))",
        grade_id: user.grade_id, 
        user_id: user.id
      )
      .distinct
  }

  private

  def student_activity_classification_tarefa
    if creator&.role == "aluno"
      self.classification = "tarefa"
    end
    self.status ||= "ativo"
  end

  def set_default_time
    self.time ||= "00:00"
  end

  
end
