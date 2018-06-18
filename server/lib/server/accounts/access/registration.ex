defmodule Server.Accounts.Access.Registration do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      alias Server.Accounts
      alias Server.Accounts.{Tenant, Registration}
      
      def registration_changeset_valid?(params) do
        changeset = Registration.changeset(%Registration{}, params)
        if changeset.valid? do
          {:ok}
        else
          {:error, changeset}
        end
      end
      
      def create_tenant_with_admin_user(params) do
        Repo.transaction(fn ->
          with {:ok, tenant} <- Accounts.create_tenant(%{name: params["tenant_name"]})
          do
            tenant #|> Repo.preload([:users])
          else
            _ -> Repo.rollback("Failed to create Account")
          end
        end)
      end
      
    end
  end
end  