defmodule EventsAppSPA.Invitees.Invitee do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invitees" do
    field :event_status, :string
    belongs_to :event, EventsAppSPA.Events.Event
    belongs_to :user, EventsAppSPA.Users.User

    timestamps()
  end

  @doc false
  def changeset(invitee, attrs) do
    invitee
    |> cast(attrs, [:event_status, :event_id, :user_id])
    |> validate_required([:event_status, :event_id, :user_id])
    |> unique_constraint(:user_id)
  end
end
