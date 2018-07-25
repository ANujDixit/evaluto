defmodule ServerWeb.Api.Admin.QuestionController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.Question

  def index(conn, _params, resource) do
    questions = Quiz.list_questions(resource)
    render(conn, "index.json", questions: questions)
  end

  def create(conn, %{"question" => question_params}, resource) do
    with {:ok, %Question{} = question} <- Quiz.create_question(resource, question_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", api_admin_question_path(conn, :show, question))
      |> render("show.json", question: question)
    end
  end

  def show(conn, %{"id" => id}, resource) do
    question = Quiz.get_question!(resource, id)
    render(conn, "show.json", question: question)
  end

  def update(conn, %{"id" => id, "question" => question_params}, resource) do
    question = Quiz.get_question!(resource, id)
    
    updated_choices =
               question_params["choices"] 
               |> Enum.filter(&match?(%{"delete" => false}, &1))
               |> Enum.with_index 
               |> Enum.map( fn({x, index}) -> Map.put(x, "seq", index + 1) end)
               
    deleted_choices =
               question_params["choices"] 
               |> Enum.filter(&match?(%{"delete" => true}, &1))
               
    question_params = Map.put(question_params, "choices", updated_choices ++ deleted_choices)      

    with {:ok, %Question{} = question} <- Quiz.update_question(resource, question, question_params) do
      render(conn, "show.json", question: question)
    end
  end

  def delete(conn, %{"id" => id}, resource) do
    question = Quiz.get_question!(resource, id)
    
    with {:ok, %Question{}} <- Quiz.delete_question(question) do
      conn
      |> put_status(:ok)
      |> json(%{data: %{message: "Deleted Successfully"}})
    end
  end
end
