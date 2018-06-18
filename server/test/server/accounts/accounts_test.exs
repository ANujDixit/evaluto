# defmodule Server.AccountsTest do
#   use Server.DataCase

#   alias Server.Accounts

#   describe "tenants" do
#     alias Server.Accounts.Tenant

#     @valid_attrs %{active: true, code: "some code", name: "some name", slug: "some slug", verified: true}
#     @update_attrs %{active: false, code: "some updated code", name: "some updated name", slug: "some updated slug", verified: false}
#     @invalid_attrs %{active: nil, code: nil, name: nil, slug: nil, verified: nil}

#     def tenant_fixture(attrs \\ %{}) do
#       {:ok, tenant} =
#         attrs
#         |> Enum.into(@valid_attrs)
#         |> Accounts.create_tenant()

#       tenant
#     end

#     test "list_tenants/0 returns all tenants" do
#       tenant = tenant_fixture()
#       assert Accounts.list_tenants() == [tenant]
#     end

#     test "get_tenant!/1 returns the tenant with given id" do
#       tenant = tenant_fixture()
#       assert Accounts.get_tenant!(tenant.id) == tenant
#     end

#     test "create_tenant/1 with valid data creates a tenant" do
#       assert {:ok, %Tenant{} = tenant} = Accounts.create_tenant(@valid_attrs)
#       assert tenant.active == true
#       assert tenant.code == "some code"
#       assert tenant.name == "some name"
#       assert tenant.slug == "some slug"
#       assert tenant.verified == true
#     end

#     test "create_tenant/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Accounts.create_tenant(@invalid_attrs)
#     end

#     test "update_tenant/2 with valid data updates the tenant" do
#       tenant = tenant_fixture()
#       assert {:ok, tenant} = Accounts.update_tenant(tenant, @update_attrs)
#       assert %Tenant{} = tenant
#       assert tenant.active == false
#       assert tenant.code == "some updated code"
#       assert tenant.name == "some updated name"
#       assert tenant.slug == "some updated slug"
#       assert tenant.verified == false
#     end

#     test "update_tenant/2 with invalid data returns error changeset" do
#       tenant = tenant_fixture()
#       assert {:error, %Ecto.Changeset{}} = Accounts.update_tenant(tenant, @invalid_attrs)
#       assert tenant == Accounts.get_tenant!(tenant.id)
#     end

#     test "delete_tenant/1 deletes the tenant" do
#       tenant = tenant_fixture()
#       assert {:ok, %Tenant{}} = Accounts.delete_tenant(tenant)
#       assert_raise Ecto.NoResultsError, fn -> Accounts.get_tenant!(tenant.id) end
#     end

#     test "change_tenant/1 returns a tenant changeset" do
#       tenant = tenant_fixture()
#       assert %Ecto.Changeset{} = Accounts.change_tenant(tenant)
#     end
#   end
# end
