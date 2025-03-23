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
      Rails.logger.info "Current User: #{current_user.inspect}"
      begin
        @activity = ActivityCreator.call(current_user, activity_params)
        render json: @activity, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      activity = Activity.find(params[:id])
  
      ActivityUpdate.new(activity, activity_params).call
      render json: { message: "Atividade atualizada com sucesso." }, status: :ok
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
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