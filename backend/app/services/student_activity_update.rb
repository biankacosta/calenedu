class StudentActivityUpdate
    def self.call(activity, user, activity_done)
      student_activity = activity.student_activities.find_by(user_id: user.id)
      if student_activity
        student_activity.update!(activity_done: activity_done)
        student_activity
      else
        raise ActiveRecord::RecordNotFound, "StudentActivity not found for user #{user.id} and activity #{activity.id}"
      end
    end
  end