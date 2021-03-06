defmodule EventsAppSPA.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :event_name, :string, null: false
      add :date, :naive_datetime
      add :description, :string
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
