defmodule Server.Accounts.User do
  use Server.Schema
  import Ecto.Changeset
  alias Server.Accounts.{Credential, Group}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :username, :string
    field :role, :string
    field :active, :boolean, default: true
    field :email_verified, :boolean, default: false
    
    many_to_many :groups, Group, join_through: "users_groups"
    
    has_many :credentials, Credential
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :username, :role, :active, :email_verified])
    |> validate_required([:first_name, :last_name, :username, :role])
    |> unique_constraint(:username, name: :tenant_username)
  end
end
