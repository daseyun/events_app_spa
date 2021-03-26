# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :events_app_spa,
  ecto_repos: [EventsAppSPA.Repo]

# Configures the endpoint
config :events_app_spa, EventsAppSPAWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tw/k88mckuW4rrLe0kvmMpT60UhG0JqvDe1EeVJ7rieap1zb9xR/ZCN0polKpehz",
  render_errors: [view: EventsAppSPAWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: EventsAppSPA.PubSub,
  live_view: [signing_salt: "cdsbRkAE"],
  mix_env: "#{Mix.env()}"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
