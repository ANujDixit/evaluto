defmodule Server.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :first_name, :string
      add :last_name, :string
      add :username, :string
      add :role, :string
      add :active, :boolean, default: true, null: false
      add :email_verified, :boolean, default: false, null: false
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id), null: false

      timestamps()
    end

    create index(:users, [:tenant_id])
    create unique_index(:users, [:tenant_id, :username], name: :tenant_username)
  end
end
