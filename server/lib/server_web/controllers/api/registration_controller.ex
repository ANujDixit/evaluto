defmodule ServerWeb.Api.RegistrationController do
  use ServerWeb, :controller
  
  alias Server.{Accounts, Notifications}
  alias Server.Notifications.Email
  alias Server.Auth.Token
  
  action_fallback ServerWeb.Api.FallbackController
  
  def show(conn, %{"tenant_name" => tenant_name}) do
    tenant = Accounts.get_tenant_by_name(tenant_name)
    render(conn, "show_name.json", tenant: tenant)
  end
  
  def show(conn, %{"tenant_code" => tenant_code}) do
    tenant = Accounts.get_tenant_by_code(tenant_code)
    render(conn, "show_code.json", tenant: tenant)
  end
  
  def create(conn, %{"signup" => params}) do
    with  {:ok} <- Accounts.registration_changeset_valid?(params),
          {:ok, tenant, user} <- Accounts.create_tenant_with_admin_user(params) 
    do  
    
      verification_url = 
        registration_url(conn, :verify_tenant, token: Token.generate_new_account_token(user))
        
      %Email{type: "new_account_verification", args: [ user.username, user.first_name, 
                                                       tenant.name, tenant.code, 
                                                       verification_url]}
      |> Notifications.send()
      
      conn
      |> put_status(:created)
      |> render("show.json", tenant: tenant)
    end
  end
  
end  