defmodule Server.Accounts do
  use Server.Accounts.Access.Tenant
  use Server.Accounts.Access.Registration
  use Server.Accounts.Access.Group
  use Server.Accounts.Access.User
  use Server.Accounts.Access.Credential
  use Server.Accounts.Access.UserGroup
end
