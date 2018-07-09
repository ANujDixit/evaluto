defmodule ServerWeb.Api.AuthenticationController do
  use ServerWeb, :controller
  alias Server.Auth.Guardian 
  alias Server.Auth
  alias Server.Accounts
  alias Server.Accounts.{Tenant, Credential}
  
  import Comeonin.Bcrypt, only: [dummy_checkpw: 0]
  
  action_fallback ServerWeb.Api.FallbackController
  
  def create(conn, %{"signin" => %{"email" => email, "password" => password, "tenant_code" => code} }) do
    with %Tenant{} = tenant <- Accounts.get_tenant_by_code(:auth, code),
         %Credential{} = credential <- Accounts.get_credential_by_email(tenant, email),
         {:ok}  <- Auth.verify_password(password, credential.password_hash) 
    do    
      case Guardian.encode_and_sign(credential.user, %{tenant_id: tenant.id, userRole: credential.user.role}) do
        {:ok, token, _claims} ->
          conn |> render("jwt.json", access_token: token)
        _ ->
          {:error, {:unauthorized, msg: "Token encode issue"}}
      end        
    else 
      {:error, :tenant_not_found} -> 
            dummy_checkpw() 
            {:error, {:unauthorized, msg: "Tenant not found"}}
      {:error, :email_not_found_in_tenant} -> 
            dummy_checkpw() 
            {:error, {:unauthorized, msg: "User not found in Tenant"}}
      {:error, :invalid_password} -> 
            {:error, {:unauthorized, msg: "Invalid Password"}}    
    end
  end
  
end  