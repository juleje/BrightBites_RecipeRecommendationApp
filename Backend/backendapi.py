from flask import Flask, jsonify, request
from flask_cors import CORS
from recipe_recommender import input_query

app = Flask(__name__)
# Prod: CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

# Example data
tasks = [
    {"hello": "world"}
]

# Home route


@app.route("/", methods=["GET"])
def home():
    return jsonify(tasks)

# Generate recipes


@app.route("/generate", methods=["POST"])
def generate():
    if not request.json or "hello" not in request.json:  # body valid
        print("error invalid data")
        return jsonify({"error": "Invalid data"}), 400
    data = request.json
    new_task = {
        "hello": data["hello"]
    }
    print(new_task)
    input_query("Italian and tomato's")

    return jsonify(new_task), 201


if __name__ == "__main__":
    app.run(debug=True)
