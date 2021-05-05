class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :user
      t.integer :score
      t.integer :movie_id

      t.timestamps
    end
  end
end
