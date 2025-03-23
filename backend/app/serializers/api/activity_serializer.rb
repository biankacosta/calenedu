module Api
  class ActivitySerializer < ActiveModel::Serializer
    attributes :id, :title, :description, :date, :classification, :course, :status, :all_grades

    attribute :activity_done do
      object.student_activities.find { |sa| sa.user_id == current_user.id }&.activity_done || false
    end

    attribute :grades do
      object.all_grades ? ["Todas"] : object.grades.pluck(:name)
    end
  end
end