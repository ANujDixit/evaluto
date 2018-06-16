defmodule ServerWeb.Api.FallbackController do
  use ServerWeb, :controller
  
  def call(conn, {:error, :not_found}) do 
    conn
    |> put_status(:not_found)
    |> render(ServerWeb.Api.ErrorView, :"404")
  end
  
end