defmodule ServerWeb.Api.Admin.TestSectionController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.{Test, Section, TestSection}
  
  def create(conn, %{"test_id" => test_id, "section" => section_params}, resource) when test_id != "" and 
                                                                                        not is_nil(section_params) do
    with %Test{} = test <- Quiz.get_test!(resource, test_id),
         %Section{} = section <- Quiz.get_or_create_section(resource, section_params),
         {:ok, _ } <- Quiz.create_test_section(resource, test, section)  
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
    end  
  end
  
end
