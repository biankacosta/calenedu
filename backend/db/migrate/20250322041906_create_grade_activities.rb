class CreateGradeActivities < ActiveRecord::Migration[7.2]
  def change
    create_table :grade_activities do |t|
      t.references :activity, null: false, foreign_key: true
      t.references :grade, null: false, foreign_key: true

      t.timestamps
    end
  end
end
