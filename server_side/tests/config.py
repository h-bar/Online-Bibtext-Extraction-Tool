
server_ip = "127.0.0.1"
server_port = "5000"

server_url = "http://" + server_ip + ':' + server_port
print("Running tests on:", server_url)

data = {
  "content": "This is a test data"
}

no_id = 'no_such_id'

truth = {
  "content": "This is a test truth"
}