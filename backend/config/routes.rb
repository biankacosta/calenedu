Rails.application.routes.draw do
  
  namespace :api do
    post 'auth/login', to: 'auth#login'

    resources :users do
      get :activities, on: :member 
    end
    resources :grades
    resources :activities do
      collection do
        get :by_student 
        get :by_grade 
      end
    end
    resources :courses
    resources :grade_activities, only: [:get, :create, :destroy]
    resources :student_activities, only: [:get, :create, :update, :destroy] do
        patch :update_status, on: :collection
    end
  end

end
