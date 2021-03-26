defmodule EventsAppSPAWeb.EventView do
  use EventsAppSPAWeb, :view
  alias EventsAppSPAWeb.EventView
  alias EventsAppSPAWeb.UserView
  alias EventsAppSPAWeb.CommentView
  alias EventsAppSPAWeb.InviteeView


  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    # IO.inspect([:render_event, event])
    %{id: event.id,
      event_name: event.event_name,
      date: event.date,
      description: event.description,
      user: render_one(event.user, UserView, "user.json"),
      comments: render_many(event.comments, CommentView, "comment.json"),
      invitees: render_many(event.invitees, InviteeView, "invitee.json")

    }
  end
end
