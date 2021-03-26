defmodule EventsAppSPA.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    has_many :events, EventsAppSPA.Events.Event
    has_many :invitees, EventsAppSPA.Invitees.Invitee
    has_many :comments, EventsAppSPA.Comments.Comment

    timestamps()
  end

  # https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/18-passwords/notes.md#lets-add-user-registrations
  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :password_hash])
    |> add_password_hash(attrs["password"])
    |> validate_required([:email, :name, :password_hash])
    |> unique_constraint(:email)
  end

  def add_password_hash(cset, nil) do
    cset
  end

  def add_password_hash(cset, password) do
    change(cset, Argon2.add_hash(password))
  end
end
