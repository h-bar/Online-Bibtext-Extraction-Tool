class abstractDB:
  def __init__(self):
    pass

  def save_data(self, data: {}) -> str:
    raise NotImplementedError("Please implement save_data interface in your model class")
  
  def get_data(self, data_id: str) -> {}:
    raise NotImplementedError("Please implement get_data interface in your model class")

  def add_truth(self, data_id: str, truth: {}) -> bool:
    raise NotImplementedError("Please implement add_truth interface in your model class")
  

class dummyDB(abstractDB):
  def __init__(self):
    super(dummyDB, self).__init__()
  
  def save_data(self, data: {}) -> str:
    self.get_data(data)
    return hash(data)
  
  def get_data(self, data_id: str) -> {}:
    return "dfsdfss"

  def add_truth(self, data_id: str, truth: {}) -> bool:
    return True

import sqlite3
import json

class sqliteDB(abstractDB):
  def __init__(self, db_file, init_schma):
    super(sqliteDB, self).__init__()

    self.db_file = db_file
    conn = self.get_conn()
    
    with open('schema.sql') as f:
        conn.executescript(f.read())

  def get_conn(self):
    conn = sqlite3.connect(self.db_file)
    conn.row_factory = sqlite3.Row
    
    return conn

  def to_string(self, data: {}) -> str:
    return json.dumps(data)

  def to_data(self, data: str) -> {}:
    return json.loads(data)
  
  def save_data(self, data: {}) -> str:
    conn = self.get_conn()
    data = self.to_string(data)
    result = conn.execute('SELECT id FROM dataT WHERE dataStr = (?)', (data, )).fetchone()
    if result == None:
      conn.execute('INSERT INTO dataT (dataStr) VALUES (?)', (data, ))
      conn.commit()
      result = conn.execute('SELECT id FROM dataT WHERE dataStr = (?)', (data, )).fetchone()
    
    return str(result['id'])
  
  def get_data(self, data_id: str) -> {}:
    conn = self.get_conn()
    result = conn.execute('SELECT dataStr FROM dataT WHERE id = (?)', (data_id, )).fetchone()
    if result == None:
      return {}
    return self.to_data(result['dataStr'])

  def add_truth(self, data_id: str, truth: {}) -> bool:
    conn = self.get_conn()
    truth = self.to_string(truth)
    conn.execute('UPDATE dataT SET truth = (?) WHERE id = (?) ', (truth, data_id))
    conn.commit()

    return True
  
  def get_truth(self, data_id: str) -> {}:
    conn = self.get_conn()
    result = conn.execute('SELECT truth FROM dataT WHERE id = (?)', (data_id, )).fetchone()
    if result == None or result['truth'] == None:
      return {}
    return self.to_data(result['truth'])
