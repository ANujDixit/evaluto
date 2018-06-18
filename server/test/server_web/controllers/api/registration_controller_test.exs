defmodule ServerWeb.Api.RegistrationControllerTest do
  use ServerWeb.ConnCase

  alias Server.Accounts
  alias Server.Accounts.Tenant

  @create_attrs %{first_name: "somename", last_name: "dfkdf", email: "wbbwef@gmail.com", 
                  tenant_name: "ddssd", password: "test@1234", password_confirmation: "test@1234"}
  @invalid_attrs %{first_name: "somename", last_name: "dfkdf", email: "wbbwef@gmail.com", 
                  tenant_name: "ddssd", password: "test@1234", password_confirmation: ""}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create Account" do
    test "renders tenant when data is valid", %{conn: conn} do
      conn = post conn, api_registration_path(conn, :create), signup: @create_attrs
      assert  %{"message" => "Account successfully created"} = json_response(conn, 201)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, api_registration_path(conn, :create), signup: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

end
