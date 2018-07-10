defmodule Server.Accounts.Access.UserGroup do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.UserGroup

      def list_users_groups(resource) do
        Repo.all(UserGroup)
      end
    
      def get_user_group!(resource, id) do
        UserGroup
        |> where([ug], ug.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_user_group(resource, user, group, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :users_groups)
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:user, user)
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:group, group)
        |> UserGroup.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_user_group(%UserGroup{} = user_group, attrs) do
        user_group
        |> UserGroup.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_user_group(%UserGroup{} = user_group) do
        Repo.delete(user_group)
      end
      
    end
  end
end  