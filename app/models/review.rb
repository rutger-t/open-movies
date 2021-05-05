class Review < ApplicationRecord
  belongs_to :user, dependent: :destroy
  validates :movie_id, uniqueness: true
end
