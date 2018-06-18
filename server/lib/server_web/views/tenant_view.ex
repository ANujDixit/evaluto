defmodule ServerWeb.TenantView do
  use ServerWeb, :view
  alias ServerWeb.TenantView

  def render("index.json", %{tenants: tenants}) do
    %{data: render_many(tenants, TenantView, "tenant.json")}
  end

  def render("show.json", %{tenant: tenant}) do
    %{data: render_one(tenant, TenantView, "tenant.json")}
  end

  def render("tenant.json", %{tenant: tenant}) do
    %{id: tenant.id,
      name: tenant.name,
      code: tenant.code,
      slug: tenant.slug,
      verified: tenant.verified,
      active: tenant.active}
  end
end
