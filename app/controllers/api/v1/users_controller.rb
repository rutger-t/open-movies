module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!
      before_action :find_user
      require "the_movie_db"

      def show
        render_jsonapi_response(@user)
      end

      def review_list
        response_json = TheMovieDb.new.get_movies_by_id(@user)
        render json: response_json
      end

      private

      def find_user
        @user = current_user
      end
    end
  end
end
