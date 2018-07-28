defmodule Server.Quiz.Test do
  use Server.Schema
  
  alias Server.Quiz.{ Instruction, Setting, Category }
  alias Server.Accounts.Group

  schema "tests" do
    field :name, :string
    field :duration, :integer, default: 0
    field :total_questions, :integer, default: 0
    field :total_marks, :decimal, default: 0
    field :difficulty_level, :integer, default: 0
    field :template_type, :integer, default: 0
    
    # has_one :test_setting, TestSetting
    # has_many :test_slots, TestSlot
    
    # many_to_many :sections, Section, join_through: "tests_sections"
    # many_to_many :groups, Group, join_through: "tests_groups"
    
    belongs_to :instruction, Instruction, foreign_key: :instruction_id, type: :binary_id
    belongs_to :category, Category, foreign_key: :category_id, type: :binary_id
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id

    timestamps()
  end

  def changeset(test, attrs) do
    test
    |> cast(attrs, [:name, :duration, :total_questions, :total_marks, :difficulty_level, :template_type])
    |> validate_required([:name, :duration, :total_questions, :total_marks, :difficulty_level, :template_type])
    |> unique_constraint(:name, name: :tenant_test_name)
  end
end
