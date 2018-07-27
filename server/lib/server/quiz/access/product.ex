defmodule Server.Quiz.Access.Product do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.Product

      def list_products(resource) do
        Product
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
      end
     
      def get_product!(resource, id) do 
        Product
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_product(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :products)
        |> Product.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_product(%Product{} = product, attrs) do
        product
        |> Product.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_product(%Product{} = product) do
        Repo.delete(product)
      end
      
    end
  end
end  