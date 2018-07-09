defmodule Server.Auth.Guardian.AuthPipeline do
    use Guardian.Plug.Pipeline, otp_app: :server,
                                module: Server.Auth.Guardian,
                                error_handler: Server.Auth.Guardian.AuthErrorHandler
  
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.EnsureAuthenticated
    plug Guardian.Plug.LoadResource
end