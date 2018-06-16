defmodule ServerWeb.Api.AuthenticationController do
  use ServerWeb, :controller
  
  action_fallback ServerWeb.Api.FallbackController
  
  def create(conn, %{"signin" => %{"email" => email, "password" => password, "tenant_code" => code} }) do
    conn
      |> put_status(:ok)
      |> render("show.json", %{access_token: "Hello"})
  end
  
end  