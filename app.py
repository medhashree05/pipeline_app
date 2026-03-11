from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html",
                           name="Medha Shree N",
                           roll="0042",
                           reg="2023BCS0042")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)