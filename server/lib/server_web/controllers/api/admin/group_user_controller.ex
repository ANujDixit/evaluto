defmodule ServerWeb.Api.Admin.GroupUserController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.UserGroup

  def index(conn, %{"group_id" => group_id}, resource) when group_id != "" do
    group_users = Accounts.list_group_users(resource, group_id) 
    render(conn, "index.json", group_users: group_users)
  end

 
end
