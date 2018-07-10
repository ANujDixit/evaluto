defmodule Server.Auth.Guardian do
  use Guardian, otp_app: :server
  alias Server.Accounts
  alias Server.Accounts.User

  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end
  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    user_id = claims["sub"]
    tenant_id = claims["tenant_id"]
    
    resource = 
      case Accounts.load_user(tenant_id, user_id) do
        nil -> nil
        %User{} = user -> %{user: user, tenant: user.tenant, role: String.to_atom(user.role)}
      end
    
    {:ok, resource}
  end
  
  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end