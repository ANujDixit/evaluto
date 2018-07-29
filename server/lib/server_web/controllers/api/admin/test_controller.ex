defmodule ServerWeb.Api.Admin.TestController do
  use ServerWeb.Api.Controller

  alias Server.Quiz  
  alias Server.Quiz.Test  

  def index(conn, _params, resource) do
    tests = Quiz.list_tests(resource) 
    render(conn, "index.json", tests: tests)
  end

  def create(conn, %{"test" => test_params}, resource) do
    with {:ok, %Test{} = test} <- Quiz.create_test(resource, test_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_test_path(conn, :show, test))
      |> render("show.json", test: test)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    test = Quiz.get_test!(resource, id)
    render(conn, "show.json", test: test)
  end

  def new(conn, _params, resource) do
    categories = Quiz.list_categories(resource) 
    sections = Quiz.list_sections(resource) 
    instructions = Quiz.list_instructions(resource) 
    render(conn, "new.json", test: %{sections: sections, categories: categories, instructions: instructions})
  end

  def update(conn, %{"id" => id, "test" => test_params}, resource) do
    test = Quiz.get_test!(resource, id)

    with {:ok, %Test{} = test} <- Quiz.update_test(test, test_params) do
      render(conn, "show.json", test: test)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    test = Quiz.get_test!(resource, id)
    with {:ok, %Test{}} <- Quiz.delete_test(test) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
