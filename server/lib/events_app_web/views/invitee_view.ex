defmodule EventsAppSPAWeb.InviteeView do
  use EventsAppSPAWeb, :view
  alias EventsAppSPAWeb.InviteeView
  alias EventsAppSPAWeb.UserView


  def render("index.json", %{invitees: invitees}) do
    %{data: render_many(invitees, InviteeView, "invitee.json")}
  end

  def render("show.json", %{invitee: invitee}) do
    %{data: render_one(invitee, InviteeView, "invitee.json")}
  end

  def render("invitee.json", %{invitee: invitee}) do
    %{id: invitee.id,
      event_status: invitee.event_status,
      user: render_one(invitee.user, UserView, "user.json")
    }
  end
end
