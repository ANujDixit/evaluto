defmodule Server.Quiz.Question do
  use Server.Schema
  
  alias Server.Quiz.Choice

  schema "questions" do
    field :title, :string
    field :explanation, :string
    field :type, :integer
    field :difficulty_level, :integer
    
    has_many :choices, Choice
    
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id
    belongs_to :created_by_user, User, foreign_key: :created_by_id, type: :binary_id
    belongs_to :updated_by_user, User, foreign_key: :updated_by_id, type: :binary_id

    timestamps()
  end

  def changeset(question, attrs, tenant) do
    question
    |> cast(attrs, [:title, :explanation, :type, :difficulty_level])
    |> validate_required([:title, :type])
    |> unique_constraint(:title, name: :tenant_question_title)
    |> cast_assoc(:choices, required: false, with: &Choice.changeset(&1, &2, tenant))
  end
end
