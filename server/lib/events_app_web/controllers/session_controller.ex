defmodule EventsAppSPAWeb.SessionController do
  use EventsAppSPAWeb, :controller
  alias EventsAppSPA.Users

  # def show(conn, %{"id" => id}) do
  #   IO.inspect([:show, id])
  #   # event = Events.get_event!(id)
  #   # |> Events.load_comments
  #   # |> Events.load_invitees
  #   # IO.inspect([:showevent, event])
  #   render(conn, "show.json", event: event)
  # end

  def create(conn, %{"email" => email, "password" => password}) do
    IO.inspect([:create, email, password])
    t_user = Users.get_user_by_email(email)

    IO.inspect([:AAAAAAAAAAAAAA])

    if t_user.name == "no_name" do
      IO.inspect([:success])

      sess = %{
        user_id: t_user.id,
        name: t_user.name,
        email: t_user.email,
        token: Phoenix.Token.sign(conn, "user_id", t_user.id)
      }

      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :created,
        Jason.encode!(%{session: sess})
      )
    else
      user = EventsAppSPA.Users.authenticate(email, password)

      if user do
        sess = %{
          user_id: user.id,
          name: user.name,
          email: user.email,
          token: Phoenix.Token.sign(conn, "user_id", user.id)
        }

        conn
        |> put_resp_header(
          "content-type",
          "application/json; charset=UTF-8"
        )
        |> send_resp(
          :created,
          Jason.encode!(%{session: sess})
        )
      else
        conn
        |> put_resp_header(
          "content-type",
          "application/json; charset=UTF-8"
        )
        |> send_resp(
          :unauthorized,
          Jason.encode!(%{error: "fail"})
        )
      end
    end
  end
end
