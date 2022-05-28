Rails.application.routes.draw do
  root 'landing#index'

  namespace :api do
    namespace :v1 do
      jsonapi_resources :warehouses, only: :index do
        jsonapi_relationships
      end
      jsonapi_resources :slots
    end
  end
end
