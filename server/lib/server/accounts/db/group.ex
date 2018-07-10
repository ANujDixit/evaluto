defmodule Server.Accounts.Group do
  use Server.Schema
  import Ecto.Changeset
   alias Server.Accounts.User

  schema "groups" do
    field :active, :boolean, default: false
    field :name, :string
    field :user_count, :integer, default: 0
    
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id
    many_to_many :users, User, join_through: "users_groups"

    timestamps()
  end

  def changeset(group, attrs) do
    group
    |> cast(attrs, [:name, :active, :user_count])
    |> validate_required([:name])
    |> unique_constraint(:name, name: :tenant_group_name)
  end
end
