defmodule ServerWeb.Api.Controller do
    defmacro __using__(_) do
      quote do
        use ServerWeb, :controller
        action_fallback ServerWeb.Api.FallbackController
        
        def action(conn, _params) do
          apply(__MODULE__, action_name(conn), [conn, conn.params, Server.Auth.Guardian.Plug.current_resource(conn)])
        end
      end
    end
end