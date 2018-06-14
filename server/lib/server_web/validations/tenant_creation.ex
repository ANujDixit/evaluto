defmodule Validation.TenantCreationValidator do
  @type ok_tuple :: {status :: atom, data :: term}
  @type reason_tuple :: {status :: atom, reason :: String.t}
  @type error_tuple :: {status :: atom, reason :: reason_tuple}

  def validate(params) do
    validators =  [
      Validation.RequestParameterValidator,
      Validation.TenantExistanceValidator,
      Validation.UserExistanceValidator,
    ]  
    validate(params, validators)
  end

  @spec validate(params :: map, validators :: list) :: ok_tuple | error_tuple
  def validate(params, validators) do
    validate_all_rules(validators, params)
  end

  defp validate_all_rules([], params) do
    {:ok, params}
  end
  
  defp validate_all_rules([head|tail], params) do
    {status, data} = head.is_valid(params)

    if status == :error do
      {:error, data}
    else
      validate_all_rules(tail, params)
    end
  end
end