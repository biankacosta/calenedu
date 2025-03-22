class CreateStudentActivities < ActiveRecord::Migration[7.2]
  def change
    create_table :student_activities do |t|
      t.references :activity, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :activity_done, default: false, null: false

      t.timestamps
    end
  end
end
