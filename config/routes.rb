Collaboration::Application.routes.draw do
  root :to => 'users#index'

  resources :users, :admins do
    collection do
      get :login_from_http_basic
    end
    member do
      get :activate
    end
  end

  resources :skins do
    member do
      get :change
    end
  end
  resources :subscriptions
  resources :user_sessions
  resources :password_resets

  get 'login' => 'user_sessions#new', :as => :login
  get 'logout' => 'user_sessions#destroy', :as => :logout

  resource :oauth do
    get :callback
  end
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

end
