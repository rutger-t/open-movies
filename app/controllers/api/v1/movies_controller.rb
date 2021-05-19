module Api
  module V1
    class MoviesController < ApplicationController
      before_action :authenticate_user!
      require "the_movie_db"

      def show
        response_json = TheMovieDb.new.get_movie_details(params['movie_id'])
        render json: response_json
      end
    end
  end
end
