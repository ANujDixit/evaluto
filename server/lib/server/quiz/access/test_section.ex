defmodule Server.Quiz.Access.TestSection do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      alias Server.Quiz
      alias Server.Quiz.{TestSection, Test, Section}
      
      def list_test_sections(resource, test) do
          TestSection
          |> where([ts], ts.tenant_id == ^resource.tenant.id)
          |> where([ts], ts.test_id == ^test.id)
          |> order_by(desc: :updated_at)
          |> Repo.all()
          |> Repo.preload(:sections)
      end
    
      def create_test_section(resource, test, section, attrs \\ %{}) do
          Ecto.build_assoc(resource.tenant, :test_sections)
          |> Ecto.Changeset.change()
          |> Ecto.Changeset.put_assoc(:test, test)
          |> Ecto.Changeset.change()
          |> Ecto.Changeset.put_assoc(:section, section)
          |> TestSection.changeset(attrs)
          |> Repo.insert()
      end
    
      def update_test_section(%TestSection{} = test_section, attrs) do
        test_section
        |> TestSection.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_test_section(%TestSection{} = test_section) do
        Repo.delete(test_section)
      end
      
    end
  end
end  