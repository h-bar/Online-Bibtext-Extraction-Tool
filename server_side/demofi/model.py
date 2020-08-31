class abstractModel:
  def init_model(self):
    raise NotImplementedError("Please implement init_model interface in your model class")

  def run_model(self, data: {}, param: {}) -> {}:
    raise NotImplementedError("Please implement run_model interface in your model class")

  def delete_model(self):
    raise NotImplementedError("Please implement run_model interface in your model class")