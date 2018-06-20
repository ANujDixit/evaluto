defmodule Server.Auth.Token do
  alias Server.Accounts
  alias Server.Accounts.User
   
  @account_verification_salt "evaluto is created by audix technologies"

  def generate_new_account_token(%User{id: user_id, tenant_id: tenant_id}) do
    Phoenix.Token.sign(ServerWeb.Endpoint, @account_verification_salt, Enum.join([tenant_id, user_id], "_") )
  end
  
  def verify_new_account_token(token) do
    max_age = 86_4000 # tokens that are older than a day should be invalid
    case Phoenix.Token.verify(ServerWeb.Endpoint, @account_verification_salt, token, max_age: max_age) do
      {:ok, identifier} ->  
        [tenant_id, user_id]  = String.split(identifier, "_")
        tenant = Accounts.get_tenant!(tenant_id)
        user = Accounts.get_user!(tenant, user_id)
        {:ok, tenant, user} 
      {:error, _} -> {:error, {:invalid_token, "Invalid Token"}}
    end
  end
  
end