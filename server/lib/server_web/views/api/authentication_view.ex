defmodule ServerWeb.Api.AuthenticationView do
  use ServerWeb, :view
  
  def render("jwt.json", %{jwt: token}) do
    %{data: %{access_token: token}} 
  end
  
end