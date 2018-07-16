defmodule Server.Accounts.Access.Group do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.Group

      def list_groups(resource) do
        Group
        |> where([g], g.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
        |> Repo.preload(:users)
      end
      
      def list_groups(resource, search_key) do
        Group
        |> where([g], g.tenant_id == ^resource.tenant.id)
        |> where([g], ilike(g.name, ^"%#{search_key}%")) 
        |> order_by(desc: :updated_at)
        |> Repo.all()
        |> Repo.preload(:users)
      end
    
      def get_group!(resource, id) do 
        Group
        |> where([g], g.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_group(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :groups)
        |> Group.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_group(%Group{} = group, attrs) do
        group
        |> Group.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_group(%Group{} = group) do
        Repo.delete(group)
      end
      
      def delete_all_groups(ids) do
        from(g in Group, 
             where: g.id in ^ids) 
        |> Repo.delete_all
      end
      
    end
  end
end  