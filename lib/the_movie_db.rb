# https://nishinatoshiharu.com/nethttp-apiclient/
class TheMovieDb
  require 'rest-client'

  def get_movies_by_search(search_term, user)
    movie_data = JSON.parse(client.get(search_by_keyword_endpoint(search_term)))
    filtered_movie_date = []
    movie_data['results'].map do |movie|
      next if movie['backdrop_path'] == nil
      movie['overview'] = movie['overview'].truncate(100)
      movie['vote_average'] = (movie['vote_average']/2).round
      movie['user_score'] = Review.where(user_id: user.id, movie_id: movie['id'])
      # returns nil or score of user
      score =  Review.find_by(user_id: user.id, movie_id: movie['id'])&.score
      movie['user_score'] = score.nil? ? nil : (score/20)
      filtered_movie_date << movie
    end
    filtered_movie_date
  end

  def get_movies_by_id(user)
    user_reviews = Review.where(user_id: user.id)
    user_movies_list = []
    user_reviews.map do |review|
      movie = JSON.parse(client.get(search_by_id_endpoint(review.movie_id)))
      movie['overview'] = movie['overview'].truncate(100)
      movie['vote_average'] = (movie['vote_average']/2).round
      score =  Review.find_by(user_id: user.id, movie_id: movie['id'])&.score
      movie['user_score'] = score.nil? ? nil : (score/20)
      user_movies_list << movie
    end
    user_movies_list
  end

  def get_movie_details(movie_id)
    movie = JSON.parse(client.get(search_by_id_endpoint(movie_id)))
    movie['vote_average'] = (movie['vote_average']/2).round
    movie['release_year'] = movie['release_date'].scan(/\d{4}/).first
    movie
  end

  private

  def client
    RestClient
  end

  def api_key
    '3d4de676a96cc5b57787a9478c635505'
  end

  def base_api_url
    "https://api.themoviedb.org/3"
  end

  def search_by_keyword_endpoint(search_term)
    return if search_term.nil?
    "#{base_api_url}/search/movie?api_key=#{api_key}&query=#{search_term}&include_adult=false"
  end

  def search_by_id_endpoint(movie_id)
    return if movie_id.nil?
    "#{base_api_url}/movie/#{movie_id}?api_key=#{api_key}"
  end
end
