defmodule Server.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :integer
      add :difficulty_level, :integer
      add :title, :string
      add :explanation, :string
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :created_by_id, references(:users, on_delete: :nothing, type: :binary_id ), null: false
      add :updated_by_id, references(:users, on_delete: :nothing, type: :binary_id )

      timestamps()
    end

    create index(:questions, [:tenant_id])
    create index(:questions, [:created_by_id])
    create index(:questions, [:updated_by_id])
    create unique_index(:questions, [:tenant_id, :title], name: :tenant_question_title)
  end
end
