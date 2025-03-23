class Api::AuthController < ApplicationController
    skip_authorization only: :login

    def login
    if params[:email].blank? || params[:password].blank?
        render json: { error: 'Email e senha são obrigatórios' }, status: :bad_request
        return
    end

    user = User.find_by(email: params[:email].downcase.strip)

    if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { token: token }, status: :ok
    else
        render json: { error: 'E-mail ou senha inválidos' }, status: :unauthorized
    end
    end
end