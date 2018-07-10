defmodule ServerWeb.Api.Admin.CategoryController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.Category

  def index(conn, _params, resource) do
    categories = Quiz.list_categories(resource)
    render(conn, "index.json", categories: categories)
  end

  def create(conn, %{"category" => category_params}, resource) do
    with {:ok, %Category{} = category} <- Quiz.create_category(resource, category_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_category_path(conn, :show, category))
      |> render("show.json", category: category)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    category = Quiz.get_category!(resource, id)
    render(conn, "show.json", category: category)
  end

  def update(conn, %{"id" => id, "category" => category_params}, resource) do
    category = Quiz.get_category!(resource, id)

    with {:ok, %Category{} = category} <- Quiz.update_category(category, category_params) do
      render(conn, "show.json", category: category)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    category = Quiz.get_category!(resource, id)
    with {:ok, %Category{}} <- Quiz.delete_category(category) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
