#!/bin/bash
apt install python3-pip
apt install python3-virtualenv
virtualenv venv
source venv/bin/activate
pip install django
pip install -r packages.txt
python3 ./petpal/manage.py makemigrations
python3 ./petpal/manage.py migrate
