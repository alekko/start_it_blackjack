from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from file_processing import write_file, read_lines

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/save_result', methods = ['POST'])
def save_result():
  params = request.get_json()
  write_file(f"{params['player']} {params['bet']} {params['result']}")
  return jsonify(status='ok')

@app.route('/show_results')
def show_results():
  return render_template('results.html', lines = read_lines())
