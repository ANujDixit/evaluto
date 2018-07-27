defmodule Server.Quiz.Instruction do
  use Server.Schema

  schema "instructions" do
    field :name, :string
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id

    timestamps()
  end

  def changeset(instruction, attrs) do
    instruction
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name, name: :tenant_instruction_name)
  end
end
