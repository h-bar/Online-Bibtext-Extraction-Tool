import requests
from tests.config import server_url
from tests.config import data, truth, no_id

data_id = ""

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

def test_get_no_truth():
  global data_id
  server_on = True
  try:
    res = requests.get(server_url + '/api/truth/' + no_id)
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'truth': {}, 
    'id': no_id
  }

def test_add_no_truth():
  global data_id
  server_on = True
  try:
    res = requests.post(server_url + '/api/truth/' + data_id)
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'id': data_id, 
    'result': False
  }

def test_add_truth():
  global data_id
  server_on = True
  try:
    res = requests.post(server_url + '/api/truth/' + data_id, json={'truth': truth})
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'id': data_id, 
    'result': True
  }

def test_get_truth():
  global data_id
  server_on = True
  try:
    res = requests.get(server_url + '/api/truth/' + data_id)
  except:
    server_on = False
  assert server_on
  assert res.status_code == 200
  assert res.json() == {
    'truth': truth, 
    'id': data_id
  }

