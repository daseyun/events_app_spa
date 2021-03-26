defmodule EventsAppSPAWeb.EventController do
  use EventsAppSPAWeb, :controller

  alias EventsAppSPA.Events
  alias EventsAppSPA.Events.Event

  action_fallback EventsAppSPAWeb.FallbackController

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    event_params = %{event_params | "date" => hd(event_params["date"])}

    IO.inspect([:event_p, event_params])
    with {:ok, %Event{} = event} <- Events.create_event(event_params) do
      event = Events.load_user(event)
      |> Events.load_comments
      |> Events.load_invitees

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_path(conn, :show, event))
      |> render("show.json", event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    # IO.inspect([:show, id])
    event = Events.get_event!(id)
    # |> Events.load_comments
    # |> Events.load_invitees
    # IO.inspect([:showevent, event])
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event_params = %{event_params | "date" => hd(event_params["date"])}
    IO.inspect([:eventUpdate, id, event_params])

    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
