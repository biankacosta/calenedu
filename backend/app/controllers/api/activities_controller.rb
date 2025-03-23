class Api::ActivitiesController < ApplicationController
    before_action :set_activity, only: [:show, :update, :destroy]
  
    def index
      user = current_user
      start_date = params[:start_date] || Date.current.beginning_of_month
      end_date = params[:end_date] || Date.current.end_of_month
    
      # Validação das datas
      if start_date > end_date
        return render json: { error: "Data inicial não pode ser maior que data final" }, status: :bad_request
      end
    
      activities = fetch_activities(user, start_date, end_date)
    
      render json: activities, each_serializer: Api::ActivitySerializer
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

    def fetch_activities(user, start_date, end_date)
      base_scope = user.aluno? ? Activity.for_student(user) : user.created_activities
      base_scope.within_date_range(start_date, end_date)
    end
  
    def set_activity
      @activity = Activity.find(params[:id])
    end
  
    def activity_params
      params.require(:activity).permit(:title, :description, :date, :time, :classification, :status, :creator_id, :course_id, :all_grades, grade_ids: [])
    end
  end