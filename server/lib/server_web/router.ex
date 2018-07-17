defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end
  
  pipeline :jwt_authenticated_admin do
    plug Server.Auth.Guardian.AuthPipeline   
    plug Server.Auth.EnsureAdmin
  end
  
  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.SentEmailViewerPlug
  end

  scope "/", ServerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/verify-tenants", RegistrationController, :verify_tenant
    
  end

  scope "/api", ServerWeb.Api, as: :api do
    pipe_through :api
    
    post "/signin", AuthenticationController, :create 
    post "/signup", RegistrationController, :create
    get "/tenants", RegistrationController, :show
   
  end
  
  scope "/api/admin", ServerWeb.Api.Admin, as: :api_admin do
    pipe_through [:api, :jwt_authenticated_admin]
    
    resources "/questions", QuestionController
    resources "/categories", CategoryController
    resources "/groups", GroupController do
      resources "/users", GroupUserController
    end
    
    resources "/users", UserController do
      resources "/groups", UserGroupController
    end
    
    post "/groups/delete_all", GroupController, :delete_all
    post "/users/delete_all", UserController, :delete_all
   
  end
  
  scope "/admin", ServerWeb.Admin do
    pipe_through :browser 

    resources "/tenants", TenantController, except: [:new, :edit]
  end
  
  
end
