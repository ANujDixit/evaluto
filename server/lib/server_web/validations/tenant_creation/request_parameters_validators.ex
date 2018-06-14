defmodule Validation.RequestParameterValidator do
  @behaviour Validation

  def is_valid(params) do
    if valid?(params), do: {:ok, params["id"]}, else: {:error, {:invalid_url_params, "URL Parameters need to be alpha numeric"}}
  end

  def valid?(%{"signup" => signup_params}) do
    signup_params
    |> Enum.all?(fn(parameter) -> alpha_numeric?(parameter) end)
  end

  defp alpha_numeric?(parameter) do
    String.match?(parameter, ~r/^[0-9a-zA-z-]+$/u)
  end

end