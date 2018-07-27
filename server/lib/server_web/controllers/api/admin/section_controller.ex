defmodule ServerWeb.Api.Admin.SectionController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.Section

  def index(conn, _params, resource) do
    sections = Quiz.list_sections(resource) 
    render(conn, "index.json", sections: sections)
  end

  def create(conn, %{"section" => section_params}, resource) do
    with {:ok, %Section{} = section} <- Quiz.create_section(resource, section_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_section_path(conn, :show, section))
      |> render("show.json", section: section)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    section = Quiz.get_section!(resource, id)
    render(conn, "show.json", section: section)
  end

  def update(conn, %{"id" => id, "section" => section_params}, resource) do
    section = Quiz.get_section!(resource, id)

    with {:ok, %Section{} = section} <- Quiz.update_section(section, section_params) do
      render(conn, "show.json", section: section)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    section = Quiz.get_section!(resource, id)
    with {:ok, %Section{}} <- Quiz.delete_section(section) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
