import requests
from tests.config import server_url
from tests.config import no_id
from ner_model import my_model

data_id = ""
data = {
  'content': 'This is another test data'
}

param = {
  "content": "test"
}

m = my_model()
m.init_model()

def test_run_data():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run', json={'data': data})
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json()['result'] == m.run_model(data, None)
  global data_id
  data_id = res.json()['id']

def test_run_no_payload():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run')
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json() == {
    'id': None,
    'result': None
  }

def test_run_no_data():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run', json={})
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json() == {
    'id': None,
    'result': None
  }

def test_run_param():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run', json={'data': data, 'param': param})
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json() == {
    'id': data_id,
    'result': m.run_model(data, param)
  }


def test_run_no_save():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run_no_save', json={'data': data, 'param': param})
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json() == {
    'id': None,
    'result': m.run_model(data, param)
  }

def test_run_data_id():
  server_on = True
  try:
    res = requests.post(server_url + '/api/run/' + data_id, json={'param': param})
  except:
    server_on = False
  assert server_on
  print(data)
  assert res.json() == {
    'id': data_id,
    'result': m.run_model(data, param)
  }