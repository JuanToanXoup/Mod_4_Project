Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/cards' => 'cards#index'
  resources :decks, :only => [:index, :show, :edit, :update, :destroy, :create]
  resources :deck_cards, :only => [:index, :show, :edit, :update, :destroy, :create]
end
