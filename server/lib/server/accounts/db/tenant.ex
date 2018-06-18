defmodule Server.Accounts.Tenant do
  use Server.Schema
  import Ecto.Changeset
  
  alias Server.Accounts

  schema "tenants" do
    field :name, :string
    field :code, :string
    field :slug, :string
    field :verified, :boolean, default: false
    field :active, :boolean, default: false

    timestamps()
  end

  def changeset(tenant, attrs) do
    tenant
    |> cast(attrs, [:name, :code, :slug, :verified, :active])
    |> validate_required([:name])
    |> slugify_name() 
    |> auto_populate_company_code()
    |> unique_constraint(:name)
    |> unique_constraint(:code)
    |> unique_constraint(:slug)
  end
  
  defp slugify_name(changeset) do
    if name = get_change(changeset, :name), do: put_change(changeset, :slug, Slugger.slugify(name)) , else: changeset
  end
  
  defp auto_populate_company_code(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true} ->  put_change(changeset, :code, gen_random_unique())
      _ ->  changeset
    end
  end
  
  def gen_random_unique() do
    unique_code = (:rand.uniform(1_000_000) - 1) |> Integer.to_string() |> String.pad_leading(6, ["0"])
    case Accounts.get_tenant_by_code(unique_code) do
      nil ->  unique_code
      _   ->  gen_random_unique()
    end
  end
end
