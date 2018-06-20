defmodule ServerWeb.Api.FallbackController do
  use ServerWeb, :controller
  
  def call(conn, {:error, :not_found}) do 
    conn
    |> put_status(:not_found)
    |> render(ServerWeb.Api.ErrorView, :"404")
  end
  
   def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(ServerWeb.Api.ChangesetView, "error.json", changeset: changeset)
  end
  
  def call(conn, {:error, {:unauthorized, msg: msg}}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{errors: msg})
  end
  
end