defmodule Server.Accounts.Access.Group do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.Group

      def list_groups do
        Repo.all(Group)
      end
    
      def get_group!(id), do: Repo.get!(Group, id)
    
      def create_group(tenant, attrs \\ %{}) do
        Ecto.build_assoc(tenant, :groups)
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
    
      def change_group(%Group{} = group) do
        Group.changeset(group, %{})
      end
      
    end
  end
end  