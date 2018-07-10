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
      
      def increment_user_count_by_n(%Group{} = group, n) when is_integer(n) do
        group
        |> Group.changeset(%{user_count: (group.user_count + n)})
        |> Repo.update()
      end
      
      def decrement_user_count_by_n(%Group{} = group, n) when is_integer(n) do
        group
        |> Group.changeset(%{user_count: (group.user_count - n)})
        |> Repo.update()
      end
      
    end
  end
end  