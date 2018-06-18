defmodule Server.Accounts do
  use Server.Accounts.Access.Tenant
  use Server.Accounts.Access.Registration
end
