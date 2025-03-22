class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :role
      t.references :grade, foreign_key: true, null: true

      t.timestamps
    end
  end
end
