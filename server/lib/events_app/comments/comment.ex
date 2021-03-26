defmodule EventsAppSPA.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    belongs_to :event, EventsAppSPA.Events.Event
    belongs_to :user, EventsAppSPA.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :event_id, :user_id])
    |> validate_required([:body, :event_id, :user_id])
  end
end
