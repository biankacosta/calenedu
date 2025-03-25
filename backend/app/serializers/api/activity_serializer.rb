module Api
  class ActivitySerializer < ActiveModel::Serializer
    attributes :id, :creator_id, :title, :time, :formatted_time, :description, :date, :classification, :course, :status, :all_grades

    attribute :activity_done do
      object.student_activities.find { |sa| sa.user_id == current_user.id }&.activity_done || false
    end

    attribute :grades do
      object.all_grades ? ["Todas"] : object.grades.pluck(:name)
    end

    def formatted_time
      object.time ? object.time.strftime("%H:%M") : ""
    end
  end
end