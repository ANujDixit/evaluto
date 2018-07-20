defmodule ServerWeb.Api.Admin.GroupUserController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.{UserGroup, Group, User}

  def index(conn, %{"group_id" => group_id}, resource) when group_id != "" do
    group_users = Accounts.list_group_users(resource, group_id) 
    render(conn, "index.json", group_users: group_users)
  end
  
  def create(conn, %{"group_id" => group_id, "user_id" => user_id}, resource) when group_id != ""  and user_id != "" do
    with %Group{} = group <- Accounts.get_group!(resource, group_id),
         %User{} = user <- Accounts.get_user!(resource, user_id),
         {:ok, _} <- Accounts.create_user_group(resource, user, group)
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
    end
  end
  
  def create(conn, %{"group_id" => group_id, "user_ids" => user_ids}, resource) when group_id != ""  and is_list(user_ids) do
    with %Group{} = group <- Accounts.get_group!(resource, group_id),
                    users <- Accounts.get_users_by_ids(resource, user_ids),
         users_to_be_inserted <- users -- group.users,
             {_n, _}  <- Accounts.add_multiple_users_to_group(resource, group, users_to_be_inserted) 
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Multiple Users Added Successfully"}})
    end
  end
  
  def delete(conn, %{"group_id" => group_id, "id" => user_id}, resource) when group_id != ""  and user_id != "" do
    user_group = Accounts.get_user_group!(resource, user_id, group_id)
    with {:ok, %UserGroup{}} <- Accounts.delete_user_group(user_group) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
  
  def delete_all(conn, %{"group_id" => group_id, "user_ids" => user_ids}, resource) when group_id != ""  and is_list(user_ids) do
    with %Group{} = group <- Accounts.get_group!(resource, group_id),
                  {_n,_}   <- Accounts.remove_users_from_group(resource, group.id, user_ids)  
    do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Users removed successfully from group"}})
    end
  end
 
end
