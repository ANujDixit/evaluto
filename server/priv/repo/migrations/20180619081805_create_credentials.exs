defmodule Server.Repo.Migrations.CreateCredentials do
  use Ecto.Migration

  def change do
    create table(:credentials, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :mode, :string
      add :email, :string
      add :password_hash, :string
      add :tenant_id, references(:tenants, on_delete: :delete_all, type: :binary_id), null: false
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false

      timestamps()
    end

    create index(:credentials, [:tenant_id])
    create index(:credentials, [:user_id])
    create unique_index(:credentials, [:tenant_id, :user_id, :mode], name: :tenant_user_mode)
  end
end
