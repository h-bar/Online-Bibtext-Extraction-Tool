import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from demofi.db import abstractDB
from demofi.model import abstractModel

class demo_app:
  def __init__(self, m: abstractModel, db : abstractDB = None):    
    self.app = Flask(__name__.split('.')[0], instance_relative_config=True)
    self.model = m
    self.db = db
    
    self.model.init_model()
    try:
      os.makedirs(self.app.instance_path)
    except OSError:
      pass

    CORS(self.app)

    if self.db == None:
      @self.app.route("/api/run", methods=['POST'])
      @self.app.route("/api/run_no_save", methods=['POST'])
      def runHandler():
        if request.json == None or 'data' not in request.json:
          return {
            'id': None,
            'result': None
          }
        
        data = request.json['data']
        
        param = None
        if 'param' in request.json:
          param = request.json['param']
          
        result = self.model.run_model(data, param)

        return {
          'id': None,
          'result': result
        }

    else:
      @self.app.route("/api/data", methods=['POST'])
      def saveHandler():
        if request.json == None or 'data' not in request.json:
          return {
            'id': None
          }

        data = request.json['data']
        data_id = self.db.save_data(data)

        return {
          'id': data_id
        }

      @self.app.route("/api/data/<data_id>", methods=['GET'])
      def getHandler(data_id):
        data = self.db.get_data(data_id)

        if data == None:
          return {
            'id': None,
            'data': None
          }

        return {
          'id': data_id,
          'data': data
        }

      @self.app.route("/api/run", methods=['POST'])
      def runHandler():
        if request.json == None or 'data' not in request.json:
          return {
            'id': None,
            'result': None
          }
        
        data = request.json['data']
        data_id = self.db.save_data(data)
        
        param = None
        if 'param' in request.json:
          param = request.json['param']
        
        result = self.model.run_model(data, param)

        return {
          'id': data_id,
          'result': result
        }

      @self.app.route("/api/run_no_save", methods=['POST'])
      def runNoSaveHandler():
        if request.json == None or 'data' not in request.json:
          return {
            'id': None,
            'result': None
          }
        
        data = request.json['data']
        
        param = None
        if 'param' in request.json:
          param = request.json['param']
        
        result = self.model.run_model(data, param)

        return {
          'id': None,
          'result': result
        }

      @self.app.route("/api/run/<data_id>", methods=['POST'])
      def runIDHandler(data_id):
        data = self.db.get_data(data_id)
        if data == None:
          return {
            'id': None,
            'result': None
          }
        
        param = None
        if 'param' in request.json:
          param = request.json['param']
        
        result = self.model.run_model(data, param)
        return {
          'id': data_id,
          'result': result
        }

      @self.app.route("/api/truth/<data_id>", methods=['POST'])
      def addTruthHandler(data_id):
        if request.json == None or 'truth' not in request.json:
          return {
            'id': data_id,
            'result': False
          }
        
        truth = request.json['truth']
        result = self.db.add_truth(data_id, truth)

        return {
          'id': data_id,
          'result': result
        }

      @self.app.route("/api/truth/<data_id>", methods=['GET'])
      def getTruthHandler(data_id):
        truth = self.db.get_truth(data_id)

        return {
          'id': data_id,
          'truth': truth
        }