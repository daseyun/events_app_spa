defmodule EventsAppSPA.Repo do
  use Ecto.Repo,
    otp_app: :events_app_spa,
    adapter: Ecto.Adapters.Postgres
end
