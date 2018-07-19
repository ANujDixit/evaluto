defmodule ServerWeb.Api.Admin.GroupUserController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.{UserGroup, Group, User}

  def index(conn, %{"group_id" => group_id}, resource) when group_id != "" do
    group_users = Accounts.list_group_users(resource, group_id) 
    render(conn, "index.json", group_users: group_users)
  end
  
  def create(conn, %{"group_id" => group_id, "id" => user_id}, resource) when group_id != ""  and user_id != "" do
    with %Group{} = group <- Accounts.get_group!(resource, group_id),
         %User{} = user <- Accounts.get_user!(resource, user_id),
         {:ok, _} <- Accounts.create_user_group(resource, user, group)
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
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
 
end
