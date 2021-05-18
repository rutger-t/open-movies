class ApplicationController < ActionController::Base
  # TODO check for security issues with protect from forgery
  protect_from_forgery with: :null_session

  def render_jsonapi_response(resource)
    if resource.errors.empty?
      render json: UserSerializer.new(resource).serializable_hash.to_json
    else
      render json: { error: resource.errors }, status: 400
    end
  end

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    render json: {
      errors: [
        {
          status: '404',
          title: 'Not Found'
        }
      ]
    }, status: 404
  end
end
