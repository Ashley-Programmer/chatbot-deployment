from flask import Flask, render_template, request, jsonify
from chat import get_response

app = Flask(__name__)

# @app.route("/", methods=["GET"])
@app.get("/")
def index_get(): # GET method
    return render_template("base.html")

@app.post("/predict")
def predict(): # POST method
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response = get_response(text)
    message = {"answer": response} # create a dictionary to send as a response
    return jsonify(message) # send the response as JSON

if __name__ == "__main__":
    app.run(debug=True) # run the app in debug mode
    