class UserSerializer
  include JSONAPI::Serializer
  attribute :id, :email
end
