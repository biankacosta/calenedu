class ApplicationController < ActionController::API
    before_action :authorize_request

    def current_user
        @current_user
    end

    private

    def self.skip_authorization(**options)
        skip_before_action :authorize_request, **options
    end

    def authorize_request
        header = request.headers['Authorization']

        if header.blank?
            render json: { error: 'Token ausente' }, status: :unauthorized
            return
        end
      
        header = header.split(' ').last

        begin
            @decoded = JsonWebToken.decode(header)
            @current_user = User.find(@decoded[:user_id])
        rescue JWT::DecodeError
            render json: { error: 'Token inválido ou expirado' }, status: :unauthorized
            return
      
          rescue ActiveRecord::RecordNotFound
            render json: { error: 'Usuário não encontrado' }, status: :unauthorized
            return
      
          rescue StandardError => e
            Rails.logger.error "Erro inesperado durante autenticação: #{e.message}"
            render json: { error: 'Ocorreu um erro inesperado' }, status: :internal_server_error
            return
        end
    end
end
