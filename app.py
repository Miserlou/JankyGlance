from flask import Flask, Response
app = Flask(__name__)

from subprocess import check_output
import json

@app.route('/')
def hello():
    return "Supply a pipe!"

@app.route('/<pipe_id>')
def pipe(pipe_id):
    out = check_output(["node", "./pipes/" + pipe_id + ".json/run.js"])
    signo = 'Running _OUTPUT (output)\n'

    if signo in out:
        outj = out.split('Running _OUTPUT (output)\n')[1]
        resp = json.loads(outj)
        resp = Response(response=outj,
                        status=200,
                        mimetype="application/json")
        return resp

    else:
        return ":("
