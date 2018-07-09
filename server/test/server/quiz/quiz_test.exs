defmodule Server.QuizTest do
  use Server.DataCase

  alias Server.Quiz

  describe "question" do
    alias Server.Quiz.Question

    @valid_attrs %{explanation: "some explanation", title: "some title"}
    @update_attrs %{explanation: "some updated explanation", title: "some updated title"}
    @invalid_attrs %{explanation: nil, title: nil}

    def question_fixture(attrs \\ %{}) do
      {:ok, question} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Quiz.create_question()

      question
    end

    test "list_question/0 returns all question" do
      question = question_fixture()
      assert Quiz.list_question() == [question]
    end

    test "get_question!/1 returns the question with given id" do
      question = question_fixture()
      assert Quiz.get_question!(question.id) == question
    end

    test "create_question/1 with valid data creates a question" do
      assert {:ok, %Question{} = question} = Quiz.create_question(@valid_attrs)
      assert question.explanation == "some explanation"
      assert question.title == "some title"
    end

    test "create_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Quiz.create_question(@invalid_attrs)
    end

    test "update_question/2 with valid data updates the question" do
      question = question_fixture()
      assert {:ok, question} = Quiz.update_question(question, @update_attrs)
      assert %Question{} = question
      assert question.explanation == "some updated explanation"
      assert question.title == "some updated title"
    end

    test "update_question/2 with invalid data returns error changeset" do
      question = question_fixture()
      assert {:error, %Ecto.Changeset{}} = Quiz.update_question(question, @invalid_attrs)
      assert question == Quiz.get_question!(question.id)
    end

    test "delete_question/1 deletes the question" do
      question = question_fixture()
      assert {:ok, %Question{}} = Quiz.delete_question(question)
      assert_raise Ecto.NoResultsError, fn -> Quiz.get_question!(question.id) end
    end

    test "change_question/1 returns a question changeset" do
      question = question_fixture()
      assert %Ecto.Changeset{} = Quiz.change_question(question)
    end
  end
end
