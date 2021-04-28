class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user, only: %w[show]

  def show
    render_jsonapi_response(@user)
  end

  private

  def find_user
    @user = current_user
  end
end
