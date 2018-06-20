import Ecto
import Ecto.Query, warn: false

alias Server.Repo
alias Server.{Accounts, Auth}
alias Server.Accounts.{Tenant, Registration, Credential, Group, UserGroup, User}
alias Server.Notifications
alias Server.Notifications.{Email, Mailer}