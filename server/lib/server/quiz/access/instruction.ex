defmodule Server.Quiz.Access.Instruction do
  defmacro __using__(_) do
    quote do  
      import Ecto.Query, warn: false
      alias Server.Repo
      
      alias Server.Quiz.Instruction

      def list_instructions(resource) do
        Instruction
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> order_by(desc: :updated_at)
        |> Repo.all()
      end
     
      def get_instruction!(resource, id) do 
        Instruction
        |> where([c], c.tenant_id == ^resource.tenant.id)
        |> Repo.get!(id)
      end  
    
      def create_instruction(resource, attrs \\ %{}) do
        Ecto.build_assoc(resource.tenant, :instructions)
        |> Instruction.changeset(attrs)
        |> Repo.insert()
      end
    
      def update_instruction(%Instruction{} = instruction, attrs) do
        instruction
        |> Instruction.changeset(attrs)
        |> Repo.update()
      end
    
      def delete_instruction(%Instruction{} = instruction) do
        Repo.delete(instruction)
      end
      
    end
  end
end  