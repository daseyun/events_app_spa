# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsAppSPA.Repo.insert!(%EventsAppSPA.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhotoBlog.Repo.insert!(%PhotoBlog.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
# https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/11-photoblog/notes.md#add-user_id-to-post
alias EventsAppSPA.Repo
alias EventsAppSPA.Users.User
alias EventsAppSPA.Events.Event
alias EventsAppSPA.Invitees.Invitee
defmodule Inject do

  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

alice = Inject.user("alice", "alice@mail.com", "test1")
bob = Inject.user("bob", "bob@mail.com", "test2")


# alice = Repo.insert!(%User{name: "alice", email: "alice@mail.com", password_hash: ""})
# bob = Repo.insert!(%User{name: "bob", email: "bob@mail.com", password_hash: ""})

p1 = Repo.insert!(%Event{
  event_name: "Alice's event",
  date: ~N[2000-01-01 23:00:07],
  description: "test description [Alice]",
  user_id: alice.id,
  # invitees: %{:yes => ["a@mail.com", "b@mail.com"], :maybe => [], :no => ["ac@mail.com"], :no_response => []}
  # invitees: %{"yes" => [], "maybe" => [], "no" => [], "no_response" => []}
})

i1 = %Invitee{
  user_id: alice.id,
  event_id: p1.id
}
Repo.insert!(i1)


# p2 = %Event{
#   event_name: "Bob's event",
#   date: ~N[2000-02-01 23:00:07],
#   description: "test description [BOb]",
#   user_id: bob.id,
#   invitees: %{:yes => [], :maybe => [], :no => [], :no_response => []}

# }
# Repo.insert!(p2)
