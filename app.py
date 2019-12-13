from flask import Flask, render_template, request, jsonify
from file_processing import write_file, read_lines

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/save_result', methods = ['POST'])
def save_result():
  # saņemsim parametrus
  print(request.form.get('value'))
  # value = request.args.get('value', type=str)
  # ierakstīsim tos failā
  # write_file(value)

  return 'ok'

@app.route('/show_results')
def show_results():
  # nolasā, rezultātus no mūsu faila
  file_lines = read_lines()
  # aizsūtīt uz mūsu html failu
  return render_template('results.html', lines = file_lines)