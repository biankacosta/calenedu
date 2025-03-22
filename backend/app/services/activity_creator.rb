class ActivityCreator
  def self.call(creator, params)
    ActiveRecord::Base.transaction do
      activity = creator.activities.create!(params.except(:all_grades, :grade_ids))
      students = fetch_students(creator, params)
      students.each { |s| StudentActivity.create!(activity: activity, user: s) }
      activity
    end
  end

  private

  def self.fetch_students(creator, params)
    return [creator] if creator.student?

    params[:all_grades] ? User.students : User.students.where(grade_id: params[:grade_ids])
  end
end