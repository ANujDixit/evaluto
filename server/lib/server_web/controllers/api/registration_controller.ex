defmodule ServerWeb.Api.RegistrationController do
  use ServerWeb, :controller
  
  alias Server.Accounts
  
  action_fallback ServerWeb.Api.FallbackController
  
  def create(conn, %{"signup" => params}) do
    with  {:ok} <- Accounts.registration_changeset_valid?(params),
          {:ok, tenant} <- Accounts.create_tenant_with_admin_user(params) 
    do
      conn
      |> put_status(:created)
      |> render("show.json", tenant: tenant)
    end
    
  end
  
end  