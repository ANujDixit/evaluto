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
# 
  describe "groups" do
    alias Server.Accounts.Group

    @valid_attrs %{active: true, name: "some name"}
    @update_attrs %{active: false, name: "some updated name"}
    @invalid_attrs %{active: nil, name: nil}

    def group_fixture(attrs \\ %{}) do
      {:ok, group} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_group()

      group
    end

    test "list_groups/0 returns all groups" do
      group = group_fixture()
      assert Accounts.list_groups() == [group]
    end

    test "get_group!/1 returns the group with given id" do
      group = group_fixture()
      assert Accounts.get_group!(group.id) == group
    end

    test "create_group/1 with valid data creates a group" do
      assert {:ok, %Group{} = group} = Accounts.create_group(@valid_attrs)
      assert group.active == true
      assert group.name == "some name"
    end

    test "create_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_group(@invalid_attrs)
    end

    test "update_group/2 with valid data updates the group" do
      group = group_fixture()
      assert {:ok, group} = Accounts.update_group(group, @update_attrs)
      assert %Group{} = group
      assert group.active == false
      assert group.name == "some updated name"
    end

    test "update_group/2 with invalid data returns error changeset" do
      group = group_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_group(group, @invalid_attrs)
      assert group == Accounts.get_group!(group.id)
    end

    test "delete_group/1 deletes the group" do
      group = group_fixture()
      assert {:ok, %Group{}} = Accounts.delete_group(group)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_group!(group.id) end
    end

    test "change_group/1 returns a group changeset" do
      group = group_fixture()
      assert %Ecto.Changeset{} = Accounts.change_group(group)
    end
  end

  describe "users" do
    alias Server.Accounts.User

    @valid_attrs %{active: true, email_verified: true, first_name: "some first_name", last_name: "some last_name", role: "some role", username: "some username"}
    @update_attrs %{active: false, email_verified: false, first_name: "some updated first_name", last_name: "some updated last_name", role: "some updated role", username: "some updated username"}
    @invalid_attrs %{active: nil, email_verified: nil, first_name: nil, last_name: nil, role: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.active == true
      assert user.email_verified == true
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.role == "some role"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.active == false
      assert user.email_verified == false
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
      assert user.role == "some updated role"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "credentials" do
    alias Server.Accounts.Credential

    @valid_attrs %{email: "some email", mode: "some mode", password_hash: "some password_hash"}
    @update_attrs %{email: "some updated email", mode: "some updated mode", password_hash: "some updated password_hash"}
    @invalid_attrs %{email: nil, mode: nil, password_hash: nil}

    def credential_fixture(attrs \\ %{}) do
      {:ok, credential} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_credential()

      credential
    end

    test "list_credentials/0 returns all credentials" do
      credential = credential_fixture()
      assert Accounts.list_credentials() == [credential]
    end

    test "get_credential!/1 returns the credential with given id" do
      credential = credential_fixture()
      assert Accounts.get_credential!(credential.id) == credential
    end

    test "create_credential/1 with valid data creates a credential" do
      assert {:ok, %Credential{} = credential} = Accounts.create_credential(@valid_attrs)
      assert credential.email == "some email"
      assert credential.mode == "some mode"
      assert credential.password_hash == "some password_hash"
    end

    test "create_credential/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_credential(@invalid_attrs)
    end

    test "update_credential/2 with valid data updates the credential" do
      credential = credential_fixture()
      assert {:ok, credential} = Accounts.update_credential(credential, @update_attrs)
      assert %Credential{} = credential
      assert credential.email == "some updated email"
      assert credential.mode == "some updated mode"
      assert credential.password_hash == "some updated password_hash"
    end

    test "update_credential/2 with invalid data returns error changeset" do
      credential = credential_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_credential(credential, @invalid_attrs)
      assert credential == Accounts.get_credential!(credential.id)
    end

    test "delete_credential/1 deletes the credential" do
      credential = credential_fixture()
      assert {:ok, %Credential{}} = Accounts.delete_credential(credential)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_credential!(credential.id) end
    end

    test "change_credential/1 returns a credential changeset" do
      credential = credential_fixture()
      assert %Ecto.Changeset{} = Accounts.change_credential(credential)
    end
  end

  describe "users_groups" do
    alias Server.Accounts.UserGroup

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_group_fixture(attrs \\ %{}) do
      {:ok, user_group} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user_group()

      user_group
    end

    test "list_users_groups/0 returns all users_groups" do
      user_group = user_group_fixture()
      assert Accounts.list_users_groups() == [user_group]
    end

    test "get_user_group!/1 returns the user_group with given id" do
      user_group = user_group_fixture()
      assert Accounts.get_user_group!(user_group.id) == user_group
    end

    test "create_user_group/1 with valid data creates a user_group" do
      assert {:ok, %UserGroup{} = user_group} = Accounts.create_user_group(@valid_attrs)
    end

    test "create_user_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user_group(@invalid_attrs)
    end

    test "update_user_group/2 with valid data updates the user_group" do
      user_group = user_group_fixture()
      assert {:ok, user_group} = Accounts.update_user_group(user_group, @update_attrs)
      assert %UserGroup{} = user_group
    end

    test "update_user_group/2 with invalid data returns error changeset" do
      user_group = user_group_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user_group(user_group, @invalid_attrs)
      assert user_group == Accounts.get_user_group!(user_group.id)
    end

    test "delete_user_group/1 deletes the user_group" do
      user_group = user_group_fixture()
      assert {:ok, %UserGroup{}} = Accounts.delete_user_group(user_group)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user_group!(user_group.id) end
    end

    test "change_user_group/1 returns a user_group changeset" do
      user_group = user_group_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user_group(user_group)
    end
  end
end
