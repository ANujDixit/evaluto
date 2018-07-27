defmodule Server.Quiz do
  use Server.Quiz.Access.Question
  use Server.Quiz.Access.Category
  use Server.Quiz.Access.Section
  use Server.Quiz.Access.Product
  use Server.Quiz.Access.Instruction
  
  use Server.Quiz.Access.Test
  use Server.Quiz.Access.TestSetting
  use Server.Quiz.Access.TestSection
  use Server.Quiz.Access.TestCategory
  use Server.Quiz.Access.TestSlot
  use Server.Quiz.Access.TestGroup
  use Server.Quiz.Access.TestProduct
  use Server.Quiz.Access.TestToken
  use Server.Quiz.Access.TestParticipant
  use Server.Quiz.Access.TestInstruction
end
