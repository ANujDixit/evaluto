defmodule Server.Repo.Migrations.CreateChoices do
  use Ecto.Migration

  def change do
    create table(:choices, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :text
      add :correct, :boolean, default: false, null: false
      add :seq, :integer
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :question_id, references(:questions, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:choices, [:tenant_id])
    create index(:choices, [:question_id])
  end
end
