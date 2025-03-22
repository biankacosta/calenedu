Rails.application.routes.draw do
  
  namespace :api do
    resources :users
    resources :grades
    resources :activities do
      collection do
        get :by_student 
        get :by_grade 
      end
    end
    resources :courses
    resources :grade_activities, only: [:create, :destroy]
    resources :student_activities, only: [:create, :update, :destroy]
  end

end
