from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "replace_this_with_secret_key"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message", "")
    # TODO: Add LLM API integration here
    reply = f"You said: {user_msg}"
    return jsonify({"reply": reply})

@app.route("/history", methods=["GET", "POST"])
def history():
    if request.method == "POST":
        session["history"] = request.json.get("history", [])
        return jsonify({"status": "saved"})
    return jsonify(session.get("history", []))

if __name__ == "__main__":
    app.run(debug=True)