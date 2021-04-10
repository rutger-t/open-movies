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

end
