defmodule Server.Repo.Migrations.CreateTestSections do
  use Ecto.Migration

  def change do
    create table(:test_sections, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :max_duration_mins, :integer
      add :total_questions, :integer
      add :default_positive_marks_per_question, :decimal
      add :default_negative_marks_per_question, :decimal
      add :total_marks, :decimal
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :test_id, references(:tests, on_delete: :delete_all, type: :binary_id ), null: false
      add :section_id, references(:sections, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:test_sections, [:tenant_id])
    create index(:test_sections, [:test_id])
    create index(:test_sections, [:section_id])
    create unique_index(:test_sections, [:tenant_id, :test_id, :section_id], name: :tenant_test_section)
  end
end
