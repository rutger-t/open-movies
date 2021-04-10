class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def render_jsonapi_response(resource)
    if resource.errors.empty?
      render json: UserSerializer.new(resource).serializable_hash.to_json
    else
      render json: { error: resource.errors }, status: 400
    end
  end

end
