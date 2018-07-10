import Ecto
import Ecto.Query, warn: false

alias Server.Repo
alias Server.{Accounts, Auth}
alias Server.Accounts.{Tenant, Registration, Credential, Group, UserGroup, User}
alias Server.Notifications
alias Server.Notifications.{Email, Mailer}
alias Server.Quiz
alias Server.Quiz.{Question, Choice, Category}
