class AddDefaultTimeToActivities < ActiveRecord::Migration[7.2]
  def change
    change_column_default :activities, :time, "00:00"
  end
end
