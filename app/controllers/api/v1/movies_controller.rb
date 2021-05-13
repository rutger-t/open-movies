class Api::V1::MoviesController < ApplicationController
  before_action :authenticate_user!
  require "the_movie_db"

  def show
    response_json = TheMovieDb.new.get_movie_details(params['movie_id'])
    render json: response_json
  end
end
