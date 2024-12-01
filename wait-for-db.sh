#!/bin/bash
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
  echo "Aguardando banco de dados estar disponível..."
  sleep 2
done
exec "$@"