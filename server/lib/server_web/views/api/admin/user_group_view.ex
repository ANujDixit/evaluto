defmodule ServerWeb.Api.Admin.UserGroupView do
  use ServerWeb, :view
  alias ServerWeb.Api.Admin.UserGroupView

  def render("index.json", %{user_groups: user_groups}) do
    %{data: render_many(user_groups, UserGroupView, "user_group.json")}
  end

  def render("show.json", %{user_group: user_group}) do
    %{data: render_one(user_group, UserGroupView, "user_group.json")}
  end

  def render("user_group.json", %{user_group: user_group}) do
    %{id: user_group.id,
      name: user_group.name
    }
  end
end
