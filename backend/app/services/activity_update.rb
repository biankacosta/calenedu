class ActivityUpdate
  def initialize(activity, params)
    @activity = activity
    @params = params
  end

  def call
    ActiveRecord::Base.transaction do
      update_activity
      update_grade_activities
      update_student_activities
      @activity
    end
  rescue ActiveRecord::RecordInvalid => e
    raise e
  end

  private

  def update_activity
    @activity.update!(@params.except(:grade_ids))
  end

  def update_grade_activities
    return if @params[:grade_ids].nil?

    @activity.grade_activities.where.not(grade_id: @params[:grade_ids]).destroy_all

    @params[:grade_ids].each do |grade_id|
      @activity.grade_activities.find_or_create_by!(grade_id: grade_id)
    end
  end

  def update_student_activities
    student_ids = User.where(grade_id: @activity.grades.pluck(:id)).pluck(:id)

    @activity.student_activities.where.not(user_id: student_ids).destroy_all

    student_ids.each do |student_id|
      @activity.student_activities.find_or_create_by!(user_id: student_id)
    end
  end
end
