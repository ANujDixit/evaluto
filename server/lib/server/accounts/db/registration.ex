defmodule Server.Accounts.Registration do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field :tenant_name, :string
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :password, :string
    field :password_confirmation, :string
  end

  def changeset(registration, attrs) do
    registration
    |> cast(attrs, [:tenant_name, :first_name, :last_name, :email, :password, :password_confirmation])
    |> validate_required([:tenant_name, :first_name, :last_name, :email, :password, :password_confirmation])
    |> validate_length(:tenant_name, max: 30)
    |> validate_length(:first_name, max: 30)
    |> validate_format(:first_name, ~r/^[A-z]+$/)
    |> validate_length(:last_name, max: 30)
    |> validate_format(:last_name, ~r/^[A-z]+$/)
    |> validate_length(:email, min: 5)
    |> validate_length(:email, max: 50)
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> validate_length(:password, min: 6)
    |> validate_length(:password, max: 30)
    |> validate_confirmation(:password)
  end

end