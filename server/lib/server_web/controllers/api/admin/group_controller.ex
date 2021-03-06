defmodule ServerWeb.Api.Admin.GroupController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.Group
  
  def index(conn, %{"search" => search_key}, resource) do
    groups = Accounts.list_groups(resource, search_key) 
    render(conn, "index.json", groups: groups)
  end

  def index(conn, _params, resource) do
    groups = Accounts.list_groups(resource) 
    render(conn, "index.json", groups: groups)
  end

  def create(conn, %{"group" => group_params}, resource) do
    with {:ok, %Group{} = group} <- Accounts.create_group(resource, group_params) do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
    end
  end
  
  def delete_all(conn, %{"_json" => ids}, resource) do
    with {_n , nil} <- Accounts.delete_all_groups(ids) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end

  def show(conn, %{"id" => id}, resource) do
    group = Accounts.get_group!(resource, id)
    render(conn, "show.json", group: group)
  end

  def update(conn, %{"id" => id, "group" => group_params}, resource) do
    group = Accounts.get_group!(resource, id)

    with {:ok, %Group{} = group} <- Accounts.update_group(group, group_params) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Updated Successfully"}})
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    group = Accounts.get_group!(resource, id)
    with {:ok, %Group{}} <- Accounts.delete_group(group) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
