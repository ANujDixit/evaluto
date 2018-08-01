defmodule Server.Quiz.Access.TestSetting do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.TestSetting
      
      def create_test_setting(resource, test, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :test_settings)
        |> Ecto.Changeset.change()
        |> Ecto.Changeset.put_assoc(:test, test)
        |> TestSetting.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_test_setting(%TestSetting{} = test_setting, attrs) do
        test_setting
        |> Test.changeset(attrs)
        |> Repo.update()
      end
      
    end
  end
end  