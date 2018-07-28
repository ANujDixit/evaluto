defmodule Server.Repo.Migrations.CreateTests do
  use Ecto.Migration

  def change do
    create table(:tests, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :duration, :integer, default: 0
      add :total_questions, :integer, default: 0
      add :total_marks, :decimal, default: 0
      add :difficulty_level, :integer, default: 0
      add :template_type, :integer, default: 0
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :instruction_id, references(:instructions, on_delete: :nothing, type: :binary_id), null: false
      add :category_id, references(:categories, on_delete: :nothing, type: :binary_id), null: false

      timestamps()
    end

    create index(:tests, [:tenant_id])
    create unique_index(:tests, [:tenant_id, :name], name: :tenant_test_name)
  end
end
