defmodule Server.Auth do

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  
  alias Server.Repo
  alias Server.Accounts.{User, Credential}
  alias Server.Auth.Guardian
  
  def verify_password(password, password_hash) when is_binary(password) and is_binary(password_hash)  do
    if checkpw(password, password_hash) do
      {:ok}
    else
      {:error, :invalid_password}
    end
  end

  def verify_password(_, _) do
    {:error, :invalid_password}
  end  
 
end