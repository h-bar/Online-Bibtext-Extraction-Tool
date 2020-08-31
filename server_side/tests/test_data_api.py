import requests
from tests.config import server_url
from tests.config import data, no_id

data_id = ""

def test_add_no_payload():
  server_on = True
  try:
    res = requests.post(server_url + '/api/data')
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {'id': None}

def test_add_no_data():
  server_on = True
  try:
    res = requests.post(server_url + '/api/data', json={})
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {'id': None}

def test_add_data():
  server_on = True
  try:
    res = requests.post(server_url + '/api/data', json={'data': data})
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json()['id'] != None
  global data_id
  data_id = res.json()['id']

def test_get_data_not_saved():
  server_on = True
  try:
    res = requests.get(server_url + '/api/data/' + no_id)
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'data': {}, 
    'id': no_id
  }

def test_get_data():
  global data_id
  server_on = True
  try:
    res = requests.get(server_url + '/api/data/' + data_id)
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'data': data, 
    'id': data_id
  }
  