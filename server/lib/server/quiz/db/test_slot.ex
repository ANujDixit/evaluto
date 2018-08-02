defmodule Server.Quiz.TestSlot do
  use Server.Schema
  use Timex
  
  alias Server.Quiz.Test

  schema "test_slots" do
    field :start_datetime, :utc_datetime, null: false
    field :end_datetime, :utc_datetime, null: false
    field :duration_mins, :integer, null: false
    
    belongs_to :tenant, Tenant, foreign_key: :tenant_id, type: :binary_id
    belongs_to :test, Test, foreign_key: :test_id, type: :binary_id

    timestamps()
  end

  def changeset(test_setting, attrs) do
    test_setting
    |> cast(attrs, [:start_datetime, :end_datetime, :duration_sec])
    |> validate_required([:start_datetime, :duration_sec])
    |> auto_populate_end_datetime()
  end
  
  defp auto_populate_end_datetime(changeset) do
  
    start_datetime = get_change(changeset, :start_datetime)
    duration_mins = get_change(changeset, :duration_mins)
    
    changeset =
      cond do
        start_datetime != nil && duration_mins != nil  -> 
          put_change(changeset, :end_datetime, derive_end_datetime(start_datetime, duration_mins))
        true -> 
          changeset
      end
  end
  
  defp derive_end_datetime(start_datetime, duration_mins) do
    Timex.shift(start_datetime, minutes: duration_mins)
  end
end
