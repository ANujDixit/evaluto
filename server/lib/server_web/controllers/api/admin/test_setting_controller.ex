defmodule ServerWeb.Api.Admin.TestSlotController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.{Test, TestSlot}
  
  def create(conn, %{"test_id" => test_id, "slot" => slot_params}, resource) when test_id != "" do
    with %Test{} = test <- Quiz.get_test!(resource, test_id),
         {:ok, _ } <- Quiz.create_test_slot(resource, test, slot_params)  
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
    end  
  end
  
end
