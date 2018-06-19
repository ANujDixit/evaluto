defmodule Server.Accounts.Access.Credential do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Accounts.Credential

      def list_credentials do
        Repo.all(Credential)
      end
    
      def get_credential!(id), do: Repo.get!(Credential, id)
    
      def create_credential(tenant, user, attrs \\ %{}) do
        Ecto.build_assoc(tenant, :credentials)
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:user, user)
        |> Credential.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_credential(%Credential{} = credential, attrs) do
        credential
        |> Credential.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_credential(%Credential{} = credential) do
        Repo.delete(credential)
      end
    
      def change_credential(%Credential{} = credential) do
        Credential.changeset(credential, %{})
      end
      
    end
  end
end  