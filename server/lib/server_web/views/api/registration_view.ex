defmodule ServerWeb.Api.RegistrationView do
  use ServerWeb, :view
  alias ServerWeb.Api.RegistrationView
  
  def render("show.json", %{tenant: tenant}) do
    %{data: %{message: "Account successfully created"}}
  end
  
end