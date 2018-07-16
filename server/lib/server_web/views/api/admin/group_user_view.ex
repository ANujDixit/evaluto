defmodule ServerWeb.Api.Admin.GroupUserView do
  use ServerWeb, :view
  alias ServerWeb.Api.Admin.GroupUserView

  def render("index.json", %{group_users: group_users}) do
    %{data: render_many(group_users, GroupUserView, "group_user.json")}
  end

  def render("show.json", %{group_user: group_user}) do
    %{data: render_one(group_user, GroupUserView, "group_user.json")}
  end

  def render("group_user.json", %{group_user: group_user}) do
    %{id: group_user.id,
      first_name: group_user.first_name,
      last_name: group_user.last_name,
      email: group_user.username
    }
  end
end
