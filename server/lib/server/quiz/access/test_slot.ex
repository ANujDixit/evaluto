defmodule Server.Quiz.Access.TestSlot do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.TestSlot
      
      def create_test_slot(resource, test, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :test_slots)
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:test, test)
        |> TestSlot.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_test_slot(%TestSlot{} = test_slot, attrs) do
        test_slot
        |> Test.changeset(attrs)
        |> Repo.update()
      end
      
    end
  end
end  