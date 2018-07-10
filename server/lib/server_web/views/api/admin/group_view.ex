defmodule ServerWeb.Api.Admin.GroupView do
  use ServerWeb, :view
  alias ServerWeb.Api.Admin.GroupView

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, GroupView, "group.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id,
      name: group.name,
      user_count: group.user_count
    }
  end
end
