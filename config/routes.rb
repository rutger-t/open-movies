Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :users, only: %w[show]
      get '/review_list' => 'users#review_list'
      get 'profile', to: 'users#show'

      resources :reviews
      get '/movie_search' => 'reviews#search'
      patch '/review_update' => 'reviews#update'
      post '/review_destroy' => 'reviews#destroy'

      get '/movie_info' => 'movies#show'
    end
  end

  devise_for :users,
    defaults: { format: :json },
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

    get '*path', to: 'pages#index', via: :all
end
