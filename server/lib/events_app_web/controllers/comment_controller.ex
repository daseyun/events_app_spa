defmodule EventsAppSPAWeb.CommentController do
  use EventsAppSPAWeb, :controller

  alias EventsAppSPA.Comments
  alias EventsAppSPA.Comments.Comment

  action_fallback(EventsAppSPAWeb.FallbackController)

  def index(conn, _params) do
    comments = Comments.list_comments()
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    IO.inspect([:commentCreate, comment_params])

    user_comment = Comments.get_comment(comment_params["user_id"], comment_params["event_id"])

    IO.inspect([:u_comment, user_comment])

    if user_comment != nil do
      update(conn, %{"id" => user_comment.id, "comment" => comment_params})
    else
      with {:ok, %Comment{} = comment} <- Comments.create_comment(comment_params) do
        comment = Comments.load_user(comment)
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.comment_path(conn, :show, comment))
        |> render("show.json", comment: comment)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{} = comment} <- Comments.update_comment(comment, comment_params) do
      render(conn, "show.json", comment: comment)
    end
  end

  def delete(conn, %{"id" => id}) do
    IO.inspect([:delet, id])
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :ok, "")
      # render(conn, "success.json")
    end
  end
end
