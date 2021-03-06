module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_review, only: [:update, :destroy]
      require "the_movie_db"

      def search
        response_json = TheMovieDb.new.get_movies_by_search(params['search_term'], current_user)
        render json: response_json
      end

      def update
        if @review.update(review_params)
          render json: ReviewSerializer.new(@review).serializable_hash.to_json
        else
          render json: { error: @review.errors }, status: 422
        end
      end

      def create
        review = Review.new(review_params)

        if review.save
          render json: ReviewSerializer.new(review).serializable_hash.to_json
        else
          render json: { error: review.errors }, status: 422
        end
      end

      def destroy
        if @review.destroy
          head :no_content
        else
          render json: { error: @review.errors }, status: 422
        end
      end

      private

      def set_review
        @review = Review.find_by(movie_id: review_params['movie_id'], user_id: current_user.id)
      end

      def review_params
        params.require(:review).permit(:score, :movie_id, :user_id)
      end
    end
  end
end
