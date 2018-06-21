defmodule ServerWeb.Api.RegistrationView do
  use ServerWeb, :view
  alias ServerWeb.Api.RegistrationView
  
  def render("show.json", %{tenant: tenant}) do
    %{data: %{message: "Account successfully created"}}
  end
  
  def render("show_code.json", %{tenant: nil}) do
    %{data: %{}}
  end
  
  def render("show_name.json", %{tenant: nil}) do
    %{data: %{}}
  end
  
  def render("show_name.json", %{tenant: tenant}) do
    %{data: %{name: tenant.name}}
  end
  
  def render("show_name.json", %{tenant: tenant}) do
    %{data: %{name: tenant.name}}
  end

  
end