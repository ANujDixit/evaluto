defmodule ServerWeb.Api.Admin.InstructionController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.Instruction

  def index(conn, _params, resource) do
    instructions = Quiz.list_instructions(resource) 
    render(conn, "index.json", instructions: instructions)
  end

  def create(conn, %{"instruction" => instruction_params}, resource) do
    with {:ok, %Instruction{} = instruction} <- Quiz.create_instruction(resource, instruction_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_instruction_path(conn, :show, instruction))
      |> render("show.json", instruction: instruction)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    instruction = Quiz.get_instruction!(resource, id)
    render(conn, "show.json", instruction: instruction)
  end

  def update(conn, %{"id" => id, "instruction" => instruction_params}, resource) do
    instruction = Quiz.get_instruction!(resource, id)

    with {:ok, %Instruction{} = instruction} <- Quiz.update_instruction(instruction, instruction_params) do
      render(conn, "show.json", instruction: instruction)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    instruction = Quiz.get_instruction!(resource, id)
    with {:ok, %Instruction{}} <- Quiz.delete_instruction(instruction) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
