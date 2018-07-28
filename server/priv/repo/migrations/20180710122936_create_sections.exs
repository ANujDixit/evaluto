defmodule Server.Repo.Migrations.CreateSections do
  use Ecto.Migration

  def change do
    create table(:sections, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:sections, [:tenant_id])
    create unique_index(:sections, [:tenant_id, :name], name: :tenant_section_name)
  end
end
