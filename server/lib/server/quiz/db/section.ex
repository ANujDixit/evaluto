defmodule Server.Quiz.Section do
  use Server.Schema

  schema "sections" do
    field :name, :string
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id

    timestamps()
  end

  def changeset(section, attrs) do
    section
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name, name: :tenant_section_name)
  end
end
