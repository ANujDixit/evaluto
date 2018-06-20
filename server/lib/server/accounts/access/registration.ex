defmodule Server.Accounts.Access.Registration do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      alias Server.Accounts
      alias Server.Accounts.{Tenant, Registration}
      
      def registration_changeset_valid?(params) do
        case Registration.changeset(%Registration{}, params) do
          %Ecto.Changeset{valid?: true} -> {:ok}
          changeset -> {:error, changeset}
        end
      end
      
      def create_tenant_with_admin_user(params) do
        Repo.transaction(fn ->
          with {:ok, tenant}  <- Accounts.create_tenant(%{name: params["tenant_name"]}),
               {:ok, group} <- Accounts.create_group(tenant, %{name: "Admin"}),
               {:ok, user} <- Accounts.create_user(tenant, %{first_name: params["first_name"], last_name: params["last_name"], username: params["email"],  role: "Owner"}),
               {:ok, credential}  <- Accounts.create_credential(tenant, user, %{mode: "email", email: params["email"], password: params["password"]}),
               {:ok, _user_group} <- Accounts.create_user_group(tenant, user, group)
          do
            tenant #|> Repo.preload([:users])
          else
           val -> Repo.rollback(val)
          end
        end)
        |> case do
          {:ok, tenant} -> {:ok, tenant}
          {:error, error} -> error
        end
      end
    end
  end
end  