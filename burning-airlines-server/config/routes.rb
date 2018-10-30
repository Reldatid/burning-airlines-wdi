Rails.application.routes.draw do

  get '/planes' => 'planes#index'
  post '/planes' => 'planes#create'
  get '/plane/:id/delete' => 'planes#destroy'

  get '/flights' => 'flights#index'
  post '/flights' => 'flights#create'
  get '/flight/:id/delete' => 'flights#destroy'
  get '/flight/search' => 'flights#search'

  get '/reservations' => 'reservations#index'
  post '/reservations' => 'reservations#create'
  get '/reservations/:id/destroy' => 'reservations#destroy'

end
