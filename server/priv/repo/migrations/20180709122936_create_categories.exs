defmodule Server.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:categories, [:tenant_id])
    create unique_index(:categories, [:tenant_id, :name], name: :tenant_category_name)
  end
end
