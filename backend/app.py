import os
from flask import Flask, json, jsonify, request, send_from_directory

app = Flask(
    __name__,
    static_folder="../frontend/static"
)

DATA_FILE = "responses.json"


@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")


@app.route("/form")
def form():
    return send_from_directory("../frontend", "form.html")


@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()

    if not data:
        return jsonify({"status": "error", "message": "No data"}), 400

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            responses = json.load(f)
    else:
        responses = []

    responses.append(data)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(responses, f, ensure_ascii=False, indent=2)

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run()
