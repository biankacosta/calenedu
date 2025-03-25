# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_03_24_220845) do
  create_table "activities", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.date "date", null: false
    t.time "time", default: "2000-01-01 00:00:00"
    t.string "classification", null: false
    t.string "status", default: "ativo", null: false
    t.integer "creator_id"
    t.integer "course_id"
    t.boolean "all_grades", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_activities_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "grade_activities", force: :cascade do |t|
    t.integer "activity_id", null: false
    t.integer "grade_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_grade_activities_on_activity_id"
    t.index ["grade_id"], name: "index_grade_activities_on_grade_id"
  end

  create_table "grades", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "student_activities", force: :cascade do |t|
    t.integer "activity_id", null: false
    t.integer "user_id", null: false
    t.boolean "activity_done", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_student_activities_on_activity_id"
    t.index ["user_id"], name: "index_student_activities_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.integer "grade_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["grade_id"], name: "index_users_on_grade_id"
  end

  add_foreign_key "activities", "courses"
  add_foreign_key "grade_activities", "activities"
  add_foreign_key "grade_activities", "grades"
  add_foreign_key "student_activities", "activities"
  add_foreign_key "student_activities", "users"
  add_foreign_key "users", "grades"
end
