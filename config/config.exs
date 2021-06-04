# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :playground,
  ecto_repos: [Playground.Repo]

# Configures the endpoint
config :playground, PlaygroundWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WsH8cV0JAvUYJCMvvCs0SpXNCIcavIMuySPxjo/I2BaTwicU83nq/QiW0PAYrVP3",
  render_errors: [view: PlaygroundWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Playground.PubSub,
  live_view: [signing_salt: "PUOk2+zo"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
