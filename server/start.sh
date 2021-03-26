export MIX_ENV=prod
export PORT=4900

CFGD=$(readlink -f ~/.config/events_app_spa)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://u_eventsspa:$DB_PASS@localhost/events_app_spa_prod

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

_build/prod/rel/events_app_spa/bin/events_app_spa start
