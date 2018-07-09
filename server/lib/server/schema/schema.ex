defmodule Server.Schema do
    defmacro __using__(_) do
      quote do
        use Ecto.Schema
        import Ecto.Changeset
        alias Server.Accounts.Tenant
        alias Server.Accounts.User
        @primary_key {:id, :binary_id, autogenerate: true}
        @foreign_key_type :binary_id
      end
    end
end