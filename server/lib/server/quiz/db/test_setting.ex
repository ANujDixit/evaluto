defmodule Server.Quiz.TestSetting do
  use Server.Schema
  
  alias Server.Quiz.Test

  schema "test_settings" do
    field :group_questions_section_wise, :boolean, default: true
    field :sections_shuffle, :boolean, default: false
    field :questions_shuffle, :boolean, default: false
    field :options_shuffle, :boolean, default: false
    
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id
    belongs_to :test, Test, foreign_key: :test_id, type: :binary_id

    timestamps()
  end

  def changeset(test_setting, attrs) do
    test_setting
    |> cast(attrs, [:group_questions_section_wise, :sections_shuffle, :questions_shuffle, :options_shuffle])
    |> unique_constraint(:test_id, name: :tenant_test)
  end
end
