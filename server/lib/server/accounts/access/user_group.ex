defmodule Server.Accounts.Access.UserGroup do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      alias Server.Accounts
      alias Server.Accounts.{UserGroup, Group}

      def list_users_groups(resource) do
        Repo.all(UserGroup)
      end
      
      def list_group_users(resource, group_id) do
          UserGroup
          |> where([ug], ug.tenant_id == ^resource.tenant.id)
          |> where([ug], ug.group_id == ^group_id)
          |> order_by(desc: :updated_at)
          |> Repo.all()
          |> Repo.preload(:user)
          |> Enum.map(fn x -> x.user end)
      end
      
      def list_user_groups(resource, user_id) do
          UserGroup
          |> where([ug], ug.tenant_id == ^resource.tenant.id)
          |> where([ug], ug.group_id == ^user_id)
          |> order_by(desc: :updated_at)
          |> Repo.all()
          |> Repo.preload(:group)
          |> Enum.map(fn x -> x.group end)
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