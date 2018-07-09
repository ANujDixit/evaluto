defmodule Server.Quiz.Access.Category do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.Category

      def list_categories(resource) do
        Category
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
      end
     
      def get_category!(resource, id) do 
        Category
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_category(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :categories)
        |> Category.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_category(%Category{} = category, attrs) do
        category
        |> Category.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_category(%Category{} = category) do
        Repo.delete(category)
      end
      
    end
  end
end  