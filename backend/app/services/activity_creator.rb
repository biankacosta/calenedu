class ActivityCreator
  def self.call(creator, params)
    raise ArgumentError, "Creator não pode ser nulo" if creator.nil?
    
    ActiveRecord::Base.transaction do
      activity = Activity.create!(params.except(:all_grades, :grade_ids).merge(creator_id: creator.id))
      students = fetch_students(creator, params)
      students.each { |s| StudentActivity.create!(activity: activity, user: s) }
      activity
    end
  end

  private

  def self.fetch_students(creator, params)
    return [creator] if creator.aluno?

    params[:all_grades] ? User.students : User.students.where(grade_id: params[:grade_ids])
  end
end