class Api::AuthController < ApplicationController
    skip_authorization only: :login

    def login
    user = User.find_by(email: params[:email].downcase.strip)
    if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { token: token }, status: :ok
    else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
    end
end