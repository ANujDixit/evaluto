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
      
      def create_user_group_and_update_user_count(resource, user, group, attrs \\ %{}) do
        Ecto.Multi.new()
        |> Ecto.Multi.run(:user_group, fn %{} -> 
                                              create_user_group(resource, user, group, attrs) 
                                       end)
        |> Ecto.Multi.run(:group, fn %{} -> 
                                      Accounts.increment_user_count_by_n(%Group{} = group, 1)
                                  end)
        |> Repo.transaction()
        |> case do
          {:ok, %{user_group: user_group}} -> {:ok, user_group}
          {:error, _ ,_ ,_} -> {:error, {:user_count_change_failed, msg: "User count update failed"}}
        end
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