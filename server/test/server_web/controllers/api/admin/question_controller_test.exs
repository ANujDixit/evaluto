defmodule ServerWeb.:"Elixir.api/admin.Question"ControllerTest do
  use ServerWeb.ConnCase

  alias Server.Quiz
  alias Server.Quiz.Question

  @create_attrs %{explanation: "some explanation", title: "some title"}
  @update_attrs %{explanation: "some updated explanation", title: "some updated title"}
  @invalid_attrs %{explanation: nil, title: nil}

  def fixture(:question) do
    {:ok, question} = Quiz.create_question(@create_attrs)
    question
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all question", %{conn: conn} do
      conn = get conn, api_admin_question_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create question" do
    test "renders question when data is valid", %{conn: conn} do
      conn = post conn, api_admin_question_path(conn, :create), question: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, api_admin_question_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "explanation" => "some explanation",
        "title" => "some title"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, api_admin_question_path(conn, :create), question: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update question" do
    setup [:create_question]

    test "renders question when data is valid", %{conn: conn, question: %Question{id: id} = question} do
      conn = put conn, api_admin_question_path(conn, :update, question), question: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, api_admin_question_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "explanation" => "some updated explanation",
        "title" => "some updated title"}
    end

    test "renders errors when data is invalid", %{conn: conn, question: question} do
      conn = put conn, api_admin_question_path(conn, :update, question), question: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete question" do
    setup [:create_question]

    test "deletes chosen question", %{conn: conn, question: question} do
      conn = delete conn, api_admin_question_path(conn, :delete, question)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, api_admin_question_path(conn, :show, question)
      end
    end
  end

  defp create_question(_) do
    question = fixture(:question)
    {:ok, question: question}
  end
end
