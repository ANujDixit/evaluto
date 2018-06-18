defmodule ServerWeb.TenantController do
  use ServerWeb, :controller

  alias Server.Accounts
  alias Server.Accounts.Tenant

  action_fallback ServerWeb.FallbackController

  def index(conn, _params) do
    tenants = Accounts.list_tenants()
    render(conn, "index.json", tenants: tenants)
  end

  def create(conn, %{"tenant" => tenant_params}) do
    with {:ok, %Tenant{} = tenant} <- Accounts.create_tenant(tenant_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", tenant_path(conn, :show, tenant))
      |> render("show.json", tenant: tenant)
    end
  end

  def show(conn, %{"id" => id}) do
    tenant = Accounts.get_tenant!(id)
    render(conn, "show.json", tenant: tenant)
  end

  def update(conn, %{"id" => id, "tenant" => tenant_params}) do
    tenant = Accounts.get_tenant!(id)

    with {:ok, %Tenant{} = tenant} <- Accounts.update_tenant(tenant, tenant_params) do
      render(conn, "show.json", tenant: tenant)
    end
  end

  def delete(conn, %{"id" => id}) do
    tenant = Accounts.get_tenant!(id)
    with {:ok, %Tenant{}} <- Accounts.delete_tenant(tenant) do
      send_resp(conn, :no_content, "")
    end
  end
end
