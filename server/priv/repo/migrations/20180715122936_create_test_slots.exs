defmodule Server.Repo.Migrations.CreateTestSlots do
  use Ecto.Migration

  def change do
    create table(:test_slots, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :start_datetime, :utc_datetime
      add :end_datetime, :utc_datetime
      add :duration_mins, :integer, default: 0
      
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id ), null: false
      add :test_id, references(:tests, on_delete: :delete_all, type: :binary_id ), null: false

      timestamps()
    end

    create index(:test_slots, [:tenant_id])
    create index(:test_slots, [:test_id])
  end
end
