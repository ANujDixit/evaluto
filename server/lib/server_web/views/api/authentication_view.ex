defmodule ServerWeb.Api.AuthenticationView do
  use ServerWeb, :view
  
  def render("jwt.json", %{access_token: token}) do
    %{access_token: token} 
  end
  
end