defmodule ServerWeb.Validation.TenantDoesNotExists do
  @behaviour Validation

  @impl true
  def is_valid(params) do
    if params["id"] == "uuid-1" do
      {:ok, params["id"]}
    else
      {:error, {:restricted, "Tenant name already exists"}}
    end
  end
end