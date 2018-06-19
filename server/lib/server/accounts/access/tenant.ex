defmodule Server.Accounts.Access.Tenant do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      
      alias Server.Repo
      alias Server.Accounts.Tenant
     
      def list_tenants do
        Repo.all(Tenant)
      end
      
      def get_tenant!(id), do: Repo.get!(Tenant, id)
    
      def create_tenant(attrs \\ %{}) do
        %Tenant{}
        |> Tenant.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_tenant(%Tenant{} = tenant, attrs) do
        tenant
        |> Tenant.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_tenant(%Tenant{} = tenant) do
        Repo.delete(tenant)
      end
    
      def change_tenant(%Tenant{} = tenant) do
        Tenant.changeset(tenant, %{})
      end
      
      # Custom Functions
      def get_tenant_by_code(code) do
        Tenant
        |> Repo.get_by(code: code)
        |> case do
          nil -> {:error, :tenant_not_found}
          tenant -> tenant
        end
      end
    end
  end
end  