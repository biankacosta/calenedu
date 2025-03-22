class Api::GradesController < ApplicationController
    before_action :set_grade, only: [:show, :update, :destroy]
  
    def index
      @grades = Grade.all
      render json: @grades
    end
  
    def show
      render json: @grade
    end
  
    def create
      @grade = Grade.new(grade_params)
      if @grade.save
        render json: @grade, status: :created
      else
        render json: @grade.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @grade.update(grade_params)
        render json: @grade
      else
        render json: @grade.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @grade.destroy
      head :no_content
    end
  
    private
  
    def set_grade
      @grade = Grade.find(params[:id])
    end
  
    def grade_params
      params.require(:grade).permit(:name)
    end
  end