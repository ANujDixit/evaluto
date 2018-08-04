defmodule ServerWeb.Api.Admin.TestSettingController do
  use ServerWeb.Api.Controller

  alias Server.Quiz
  alias Server.Quiz.{Test, TestSetting}
  
  def create(conn, %{"test_id" => test_id, "setting" => setting_params}, resource) when test_id != "" do
    with %Test{} = test <- Quiz.get_test!(resource, test_id),
         {:ok, _ } <- Quiz.create_test_setting(resource, test, setting_params)  
    do
      conn
      |> put_status(:created)
      |> json(%{data: %{message: "Created Successfully"}})
    end  
  end
  
end
