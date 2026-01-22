from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../frontend")

# Route pour servir le fichier index.html
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# Serve css, js, assets
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route("/form")
def form():
    return send_from_directory(app.static_folder, "form.html")

app.run()