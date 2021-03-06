# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :server,
  ecto_repos: [Server.Repo]

# Configures the endpoint
config :server, ServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TO8ly0C94utEe/k7PliAAahTr2Saucv3PInC5GGupNGfWCHR0LStMGnpG2jE5qQQ",
  render_errors: [view: ServerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Server.PubSub,
           adapter: Phoenix.PubSub.PG2]
           
config :server, Server.Auth.Guardian,
       issuer: "server",
       secret_key: "QWhtuwWyddyBIsFVR8QVtAvbi8lXAJJ9hBxxGuIQv4KiJvCB8Zu9C9WmVW1S8ugn"           

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
