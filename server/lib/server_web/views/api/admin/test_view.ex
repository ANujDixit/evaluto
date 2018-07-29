defmodule ServerWeb.Api.Admin.TestView do
  use ServerWeb, :view
  alias ServerWeb.Api.Admin.TestView

  def render("index.json", %{tests: tests}) do
    %{data: render_many(tests, TestView, "test.json")}
  end

  def render("show.json", %{test: test}) do
    %{data: render_one(test, TestView, "test.json")}
  end  

  def render("new.json", %{test: test}) do
    %{data: render_one(test, TestView, "new_api.json")}    
  end

  def render("new_api.json", %{test: test}) do
    %{
      sections: render_many(test.sections, __MODULE__, "section.json", as: :section),
      categories: render_many(test.categories, __MODULE__, "category.json", as: :category),
      instructions: render_many(test.instructions, __MODULE__, "instruction.json", as: :instruction)
    }
  end

  def render("test.json", %{test: test}) do
    %{id: test.id,
      name: test.name}
  end

  def render("section.json", %{section: section}) do
    %{value: section.id,
      viewValue: section.name   
    }
  end

  def render("category.json", %{category: category}) do
    %{value: category.id,
      viewValue: category.name   
    }
  end

  def render("instruction.json", %{instruction: instruction}) do
    %{value: instruction.id,
      viewValue: instruction.name   
    }
  end

  def render("instruction.json", %{instruction: instruction}) do
    %{value: instruction.id,
      viewValue: instruction.name   
    }
  end
end
