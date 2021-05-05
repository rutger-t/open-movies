# https://nishinatoshiharu.com/nethttp-apiclient/
class TheMovieDb
  require 'rest-client'

  def get_movies(search_term, user_id)
    movie_data = JSON.parse(client.get(endpoint(search_term)))
    filtered_movie_date = []
    movie_data['results'].map do |movie|
      next if movie['backdrop_path'] == nil
      movie['overview'] = movie['overview'].truncate(100)
      if Review.where(user_id: user_id, movie_id: movie['id']).present?
        movie['already_reviewed'] = true
      else
        movie['already_reviewed'] =  false
      end
      filtered_movie_date << movie
    end
    filtered_movie_date
  end

  private

  def client
    RestClient
  end

  def api_key
    '3d4de676a96cc5b57787a9478c635505'
  end

  def endpoint(search_term)
    "https://api.themoviedb.org/3/search/movie?api_key=#{api_key}&query=#{search_term}&include_adult=false"
  end
end
