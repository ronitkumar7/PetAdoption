apt install python3-pip
apt install python3-virtualenv
virtualenv venv
source venv/bin/activate
pip install -r packages.txt
python3 manage.py makemigrations
python3 manage.py migrate
