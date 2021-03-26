defmodule EventsAppSPAWeb.PageController do
  use EventsAppSPAWeb, :controller

  def index(conn, _params) do
    events = EventsAppSPA.Events.list_events()
    render(conn, "index.html", events: events)
  end
end
