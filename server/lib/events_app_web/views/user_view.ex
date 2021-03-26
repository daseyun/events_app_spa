defmodule EventsAppSPAWeb.UserView do
  use EventsAppSPAWeb, :view
  alias EventsAppSPAWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    # IO.inspect([:render_user, user])
    %{id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password_hash}
  end
end
