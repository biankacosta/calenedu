class CreateActivities < ActiveRecord::Migration[7.2]
  def change
    create_table :activities do |t|
      t.string :title, null: false
      t.text :description
      t.date :date, null: false
      t.time :time
      t.string :classification, null: false
      t.string :status, default: "ativo", null: false
      t.integer :creator_id
      t.references :course, foreign_key: true
      t.boolean :all_grades, default: false, null: false

      t.timestamps
    end
  end
end
