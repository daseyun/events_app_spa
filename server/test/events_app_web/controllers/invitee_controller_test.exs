defmodule EventsAppSPAWeb.InviteeControllerTest do
  use EventsAppSPAWeb.ConnCase

  alias EventsAppSPA.Invitees
  alias EventsAppSPA.Invitees.Invitee

  @create_attrs %{
    event_status: "some event_status"
  }
  @update_attrs %{
    event_status: "some updated event_status"
  }
  @invalid_attrs %{event_status: nil}

  def fixture(:invitee) do
    {:ok, invitee} = Invitees.create_invitee(@create_attrs)
    invitee
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all invitees", %{conn: conn} do
      conn = get(conn, Routes.invitee_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create invitee" do
    test "renders invitee when data is valid", %{conn: conn} do
      conn = post(conn, Routes.invitee_path(conn, :create), invitee: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.invitee_path(conn, :show, id))

      assert %{
               "id" => id,
               "event_status" => "some event_status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.invitee_path(conn, :create), invitee: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update invitee" do
    setup [:create_invitee]

    test "renders invitee when data is valid", %{conn: conn, invitee: %Invitee{id: id} = invitee} do
      conn = put(conn, Routes.invitee_path(conn, :update, invitee), invitee: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.invitee_path(conn, :show, id))

      assert %{
               "id" => id,
               "event_status" => "some updated event_status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, invitee: invitee} do
      conn = put(conn, Routes.invitee_path(conn, :update, invitee), invitee: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete invitee" do
    setup [:create_invitee]

    test "deletes chosen invitee", %{conn: conn, invitee: invitee} do
      conn = delete(conn, Routes.invitee_path(conn, :delete, invitee))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.invitee_path(conn, :show, invitee))
      end
    end
  end

  defp create_invitee(_) do
    invitee = fixture(:invitee)
    %{invitee: invitee}
  end
end
