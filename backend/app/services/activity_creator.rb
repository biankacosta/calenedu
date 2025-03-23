class ActivityCreator
  def self.call(creator, params)

    ActiveRecord::Base.transaction do
      activity = Activity.create!(params.except(:all_grades, :grade_ids).merge(creator_id: creator.id))

      unless params[:all_grades] || params[:grade_ids].blank?
        params[:grade_ids].each do |grade_id|
          GradeActivity.create!(activity: activity, grade_id: grade_id)
        end
      end

      students = fetch_students(creator, params)
      students.each { |s| StudentActivity.create!(activity: activity, user: s) }
      activity
    end
  rescue ActiveRecord::RecordInvalid => e
    raise e
  end

  private

  def self.fetch_students(creator, params)
    return [creator] if creator.aluno?

    params[:all_grades] ? User.aluno : User.aluno.where(grade_id: params[:grade_ids])
  end
end