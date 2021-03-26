defmodule EventsAppSPAWeb.InviteeController do
  use EventsAppSPAWeb, :controller

  alias EventsAppSPA.Invitees
  alias EventsAppSPA.Invitees.Invitee
  alias EventsAppSPA.Users

  action_fallback EventsAppSPAWeb.FallbackController

  def index(conn, _params) do
    invitees = Invitees.list_invitees()
    render(conn, "index.json", invitees: invitees)
  end

  def create(conn, %{"invitee" => invitee_params}) do
    IO.inspect([:create, invitee_params])

    invited_user = findOrCreateUser(invitee_params["email"])
    invitee_params = %{"event_status" => "no_response", "event_id" => invitee_params["event_id"], "user_id" => invited_user.id}

    IO.inspect([:create2, invitee_params])

    with {:ok, %Invitee{} = invitee} <- Invitees.create_invitee(invitee_params) do
      invitee = Invitees.load_user(invitee)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.invitee_path(conn, :show, invitee))
      |> render("show.json", invitee: invitee)
    end
  end

  def show(conn, %{"id" => id}) do
    invitee = Invitees.get_invitee!(id)
    render(conn, "show.json", invitee: invitee)
  end

  def update(conn, %{"id" => id, "invitee" => invitee_params}) do
    invitee = Invitees.get_invitee!(id)

    with {:ok, %Invitee{} = invitee} <- Invitees.update_invitee(invitee, invitee_params) do
      render(conn, "show.json", invitee: invitee)
    end
  end

  def delete(conn, %{"id" => id}) do
    invitee = Invitees.get_invitee!(id)

    with {:ok, %Invitee{}} <- Invitees.delete_invitee(invitee) do
      send_resp(conn, :no_content, "")
    end
  end

  def findOrCreateUser(email) do
    user = Users.get_user_by_email(email)

    IO.inspect([:findOrCreate, user])
    if user != nil do
      user
    else
      newUserAttr = %{email: email, name: "no_name", password_hash: "test"}

      case Users.create_user(newUserAttr) do
        {:ok, user} -> user
        {:error, _} -> nil
      end
    end
  end
end
