defmodule Server.Quiz.Product do
  use Server.Schema

  schema "products" do
    field :name, :string
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id

    timestamps()
  end

  def changeset(product, attrs) do
    product
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name, name: :tenant_product_name)
  end
end
