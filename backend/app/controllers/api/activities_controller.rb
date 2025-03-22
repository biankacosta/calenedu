class Api::ActivitiesController < ApplicationController
    before_action :set_activity, only: [:show, :update, :destroy]
  
    def index
      @activities = Activity.all
      render json: @activities
    end
  
    def show
      render json: @activity
    end
  
    def create
      begin
        @activity = ActivityCreator.call(current_user, activity_params)
        render json: @activity, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      if @activity.update(activity_params)
        render json: @activity
      else
        render json: @activity.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @activity.destroy
      head :no_content
    end
  
    private
  
    def set_activity
      @activity = Activity.find(params[:id])
    end
  
    def activity_params
      params.require(:activity).permit(:title, :description, :date, :time, :classification, :status, :creator_id, :course_id, :all_grades, grade_ids: [])
    end
  end