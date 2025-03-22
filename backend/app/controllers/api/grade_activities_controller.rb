class Api::GradeActivitiesController < ApplicationController
    def create
      @grade_activity = GradeActivity.new(grade_activity_params)
      if @grade_activity.save
        render json: @grade_activity, status: :created
      else
        render json: @grade_activity.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @grade_activity = GradeActivity.find(params[:id])
      @grade_activity.destroy
      head :no_content
    end
  
    private
  
    def grade_activity_params
      params.require(:grade_activity).permit(:activity_id, :grade_id)
    end
  end
  