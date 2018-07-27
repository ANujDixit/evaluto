defmodule ServerWeb.Api.Admin.ProductController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.Product

  def index(conn, _params, resource) do
    products = Quiz.list_products(resource) 
    render(conn, "index.json", products: products)
  end

  def create(conn, %{"product" => product_params}, resource) do
    with {:ok, %Product{} = product} <- Quiz.create_product(resource, product_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_product_path(conn, :show, product))
      |> render("show.json", product: product)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    product = Quiz.get_product!(resource, id)
    render(conn, "show.json", product: product)
  end

  def update(conn, %{"id" => id, "product" => product_params}, resource) do
    product = Quiz.get_product!(resource, id)

    with {:ok, %Product{} = product} <- Quiz.update_product(product, product_params) do
      render(conn, "show.json", product: product)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    product = Quiz.get_product!(resource, id)
    with {:ok, %Product{}} <- Quiz.delete_product(product) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
