defmodule Server.Accounts.Access.User do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.User

      def list_users(resource) do
        User
        |> where([u], u.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
        |> Repo.preload(:groups)
      end
      
      def list_users(resource, search_key) do
        User
        |> where([u], u.tenant_id == ^resource.tenant.id)
        |> where([u], ilike(u.first_name, ^"%#{search_key}%")) 
        |> or_where([u], ilike(u.last_name, ^"%#{search_key}%")) 
        |> or_where([u], ilike(u.email, ^"%#{search_key}%")) 
        |> order_by(desc: :updated_at)
        |> Repo.all()
        |> Repo.preload(:groups)
      end
      
      def get_user!(resource, id) do
        User
        |> where([u], u.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end 
      
      def load_user(tenant_id, id) do
        User
        |> where([u], u.tenant_id == ^tenant_id)
        |> Repo.get(id)
        |> Repo.preload(:tenant)
      end 
    
      def create_user(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :users)
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
      
      def delete_all_users(ids) do
        from(u in User, where: u.id in ^ids) 
        |> Repo.delete_all
      end
      
    end
  end
end  