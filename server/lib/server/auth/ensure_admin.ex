defmodule Server.Auth.EnsureAdmin do
    import Plug.Conn
    import Phoenix.Controller, only: [render: 4]
    alias Server.Accounts   
  
    def init(options), do: options
  
    def call(conn, _opts) do      
      resource = Server.Guardian.Plug.current_resource(conn)
      if resource && resource.tenant && resource.user && resource.role && resource.role == :admin do        
        conn        
      else      
        conn   
        |> put_status(:unauthorized)
        |> render(ServerWeb.Api.ErrorView, "401.json", message: "Unauthenticated admin user")
        |> halt()
      end      
    end

end