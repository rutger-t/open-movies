class ReviewSerializer
  include JSONAPI::Serializer
  attributes :id, :movie_id, :score
end
