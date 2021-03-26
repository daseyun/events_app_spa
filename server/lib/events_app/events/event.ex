defmodule EventsAppSPA.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :naive_datetime
    field :description, :string
    field :event_name, :string
    belongs_to :user, EventsAppSPA.Users.User
    has_many :invitees, EventsAppSPA.Invitees.Invitee
    has_many :comments, EventsAppSPA.Comments.Comment

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:event_name, :date, :description, :user_id])
    |> validate_required([:event_name, :date, :description, :user_id])
  end
end
