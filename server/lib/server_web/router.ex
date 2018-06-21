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
  
  scope "/admin", ServerWeb.Admin do
    pipe_through :browser 

    resources "/tenants", TenantController, except: [:new, :edit]
  end
  
  
end
