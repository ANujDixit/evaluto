defmodule Server.Repo.Migrations.CreateTestSettings do
  use Ecto.Migration

  def change do
    create table(:test_settings, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :group_questions_section_wise, :boolean, default: true, null: false
      add :sections_shuffle, :boolean, default: false, null: false
      add :questions_shuffle, :boolean, default: false, null: false
      add :options_shuffle, :boolean, default: false, null: false
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :test_id, references(:tests, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:test_settings, [:tenant_id])
    create index(:test_settings, [:test_id])
    create unique_index(:test_settings, [:tenant_id, :test_id], name: :tenant_test)
  end
end
