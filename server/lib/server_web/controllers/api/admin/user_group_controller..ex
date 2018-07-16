defmodule ServerWeb.Api.Admin.UserGroupController do
  use ServerWeb.Api.Controller

  alias Server.Accounts
  alias Server.Accounts.UserGroup

  def index(conn, %{"user_id" => user_id}, resource) when user_id != "" do
    user_groups = Accounts.list_user_groups(resource, user_id) 
    render(conn, "index.json", user_groups: user_groups)
  end
 
end
