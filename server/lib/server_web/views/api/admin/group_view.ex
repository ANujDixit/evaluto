defmodule ServerWeb.Api.Admin.GroupView do
  use ServerWeb, :view
  alias ServerWeb.Api.Admin.GroupView

  def render("index.json", %{groups: groups}) do
    %{data: render_many(groups, GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, GroupView, "group.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id,
      name: group.name,
      description: group.description,
      user_count: length(group.users),
      users:  render_many(group.users, __MODULE__, "user.json", as: :user)
    }
  end
  
  def render("user.json", %{user: user}) do
    %{id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role
    }
  end
 
end
