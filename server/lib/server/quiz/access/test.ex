defmodule Server.Quiz.Access.Test do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.Test

      def list_tests(resource) do
        Test
        |> where([t], t.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
      end
     
      def get_test!(resource, id) do 
        Test
        |> where([t], t.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_test(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :tests)
        |> Test.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_test(%Test{} = test, attrs) do
        test
        |> Test.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_test(%Test{} = test) do
        Repo.delete(test)
      end
      
    end
  end
end  