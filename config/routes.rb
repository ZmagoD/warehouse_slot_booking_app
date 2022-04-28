Rails.application.routes.draw do
  root 'landing#index'

  namespace :api do
    namespace :v1 do
      jsonapi_resources :warehouses, only: :show do
        jsonapi_resources :slots
      end
    end
  end
end
