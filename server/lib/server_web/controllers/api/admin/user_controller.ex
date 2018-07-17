defmodule ServerWeb.Api.Admin.UserController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.User
  
  def index(conn, %{"search" => search_key}, resource) do
    users = Accounts.list_users(resource, search_key) 
    render(conn, "index.json", users: users)
  end

  def index(conn, _params, resource) do
    users = Accounts.list_users(resource) 
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}, resource) do
    with {:ok, %User{} = user} <- Accounts.create_user(resource, user_params) do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "User Created Successfully"}})
    end
  end
  
  def delete_all(conn, %{"_json" => ids}, resource) do
    with {_n , nil} <- Accounts.delete_all_users(ids) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "User Deleted Successfully"}})
    end
  end

  def show(conn, %{"id" => id}, resource) do
    user = Accounts.get_user!(resource, id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}, resource) do
    user = Accounts.get_user!(resource, id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "User Updated Successfully"}})
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    user = Accounts.get_user!(resource, id)
    with {:ok, %User{}} <- Accounts.delete_user(user) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "User Deleted Successfully"}})
    end
  end
end
