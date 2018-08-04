defmodule Server.Quiz.Access.Section do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.Section

      def list_sections(resource) do
        Section
        |> where([s], s.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
      end
     
      def get_section!(resource, id) do 
        Section
        |> where([s], s.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
      
      def get_or_create_section!(resource, section_params) do
        if name = section_params["name"] do
          Repo.get_by(Section, name: name) || create_section(resource, section_params)
        end
      end
    
      def create_section(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :sections)
        |> Section.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_section(%Section{} = section, attrs) do
        section
        |> Section.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_section(%Section{} = section) do
        Repo.delete(section)
      end
      
    end
  end
end  