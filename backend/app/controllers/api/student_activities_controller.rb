class Api::StudentActivitiesController < ApplicationController
    def create
      @student_activity = StudentActivity.new(student_activity_params)
      if @student_activity.save
        render json: @student_activity, status: :created
      else
        render json: @student_activity.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @student_activity = StudentActivity.find(params[:id])
      if @student_activity.update(student_activity_params)
        render json: @student_activity
      else
        render json: @student_activity.errors, status: :unprocessable_entity
      end
    end

    def update_status
      activity = Activity.find(params[:activity_id])
      user = current_user
      
      updated_student_activity = StudentActivityUpdate.call(activity, user, params[:activity][:activity_done])
      
      render json: updated_student_activity, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def destroy
      @student_activity = StudentActivity.find(params[:id])
      @student_activity.destroy
      head :no_content
    end
  
    private
  
    def student_activity_params
      params.require(:student_activity).permit(:activity_id, :student_id, :activity_done)
    end
  end
  