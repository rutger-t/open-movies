class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!
  require "the_movie_db"

  def search
    response_json = TheMovieDb.new.get_movies(params['search_term'], current_user.id)
    render json: response_json
  end

  def create
    review = Review.new(review_params)

    if review.save
      render json: ReviewSerializer.new(review).serializable_hash.to_json
    else
      render json: { error: review.errors }, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:score, :movie_id, :user_id)
  end
end