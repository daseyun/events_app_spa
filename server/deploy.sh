#!/bin/bash

export MIX_ENV=prod
# Common port range for this is 4000-10,000
# Valid port range for a user app to listen
# on is something like 1025-32767
export PORT=4900
export SECRET_KEY_BASE=TEDK0jctXVIe7Fg23mUOH5hJOrwFVQRzdEVhlCHyt0YwnRlvT0cijkYc3WJq3ij4
export DATABASE_URL=ecto://u_eventsspa:Nei7oeX6er6I@localhost/events_app_spa_prod
mix ecto.create
mix deps.get --only prod
mix compile

CFGD=$(readlink -f ~/.config/events_app_spa)

if [ ! -d "$CFGD" ]; then
    mkdir -p "$CFGD"
fi

if [ ! -e "$CFGD/base" ]; then
    mix phx.gen.secret > "$CFGD/base"
fi

if [ ! -e "$CFGD/db_pass" ]; then
    pwgen 12 1 > "$CFGD/db_pass"
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://u_eventsspa:$DB_PASS@localhost/events_app_spa_prod

mix ecto.migrate

mix ecto.reset
#mix phx.digest

mix release
