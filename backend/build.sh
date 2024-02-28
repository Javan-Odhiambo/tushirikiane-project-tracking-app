#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py makemigrations
python manage.py makemigrations accounts
python manage.py makemigrations project_tracker

python manage.py migrate
python manage.py migrate accounts
python manage.py migrate project_tracker


# deploy command: python -m gunicorn config.asgi:application --worker-class uvicorn.workers.UvicornWorker