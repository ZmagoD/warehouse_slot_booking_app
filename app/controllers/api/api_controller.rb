module Api
  class ApiController < ActionController::API
    include JSONAPI::ActsAsResourceController
  end
end