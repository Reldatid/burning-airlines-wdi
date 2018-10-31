Rails.application.routes.draw do

  get '/planes' => 'planes#index'
  post '/planes' => 'planes#create'
  get '/planes/:id/delete' => 'planes#destroy'

  get '/flights' => 'flights#index'
  post '/flights' => 'flights#create'
  get '/flights/search' => 'flights#search'
  get '/flights/:id' => 'flights#show'
  get '/flights/:id/delete' => 'flights#destroy'

  get '/reservations' => 'reservations#index'
  post '/reservations' => 'reservations#create'
  get '/reservations/:id/destroy' => 'reservations#destroy'

end
