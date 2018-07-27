defmodule Server.Repo.Migrations.CreateInstructions do
  use Ecto.Migration

  def change do
    create table(:instructions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:instructions, [:tenant_id])
    create unique_index(:instructions, [:tenant_id, :name], name: :tenant_instruction_name)
  end
end
