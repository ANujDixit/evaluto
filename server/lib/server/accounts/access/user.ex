defmodule Server.Accounts.Access.User do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.User

      def list_users do
        Repo.all(User)
      end
    
      def get_user!(id), do: Repo.get!(User, id)
      
      def get_user!(tenant, id) do
        User
        |> where([u], u.tenant_id == ^tenant.id)
        |> Repo.get!(id)
      end 
      
      def load_user!(tenant_id, id) do
        User
        |> where([u], u.tenant_id == ^tenant_id)
        |> Repo.get!(id)
        |> Repo.preload(:tenant)
      end 
    
      def create_user(tenant, attrs \\ %{}) do
        Ecto.build_assoc(tenant, :users)
        |> User.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_user(%User{} = user, attrs) do
        user
        |> User.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_user(%User{} = user) do
        Repo.delete(user)
      end
    
      def change_user(%User{} = user) do
        User.changeset(user, %{})
      end
      
    end
  end
end  