defmodule Server.Accounts.UserGroup do
  use Server.Schema
  import Ecto.Changeset
  alias Server.Accounts.{User, Group}

  schema "users_groups" do
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id
    belongs_to :group, Group, foreign_key: :group_id, type: :binary_id
    belongs_to :user, User, foreign_key: :user_id, type: :binary_id 

    timestamps()
  end
 
  def changeset(user_group, attrs) do
    user_group
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:user_id, name: :tenant_user_group)
  end
end
