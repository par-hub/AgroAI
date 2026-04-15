"""
AgroAI Flask inference server.
Uses full TensorFlow TFLite interpreter — supports all op versions including
FULLY_CONNECTED v12 which tflite_flutter cannot run on-device.

Setup:
    pip install -r requirements.txt
    python app.py

The server must be on the same WiFi network as the phone.
Find your PC IP:  ipconfig  →  IPv4 Address  (e.g. 192.168.1.100)
Set that IP in:   lib/utils/constants.dart  →  flaskBaseUrl
"""

import io
import os

import numpy as np
from flask import Flask, jsonify, request
from PIL import Image, ImageOps

# Use full TensorFlow — supports all op versions the model was built with
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)

# ── Config ──────────────────────────────────────────────────────────────
BASE_DIR    = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH  = os.path.join(BASE_DIR, "..", "assets", "cattle_model (1).tflite")
LABELS_PATH = os.path.join(BASE_DIR, "..", "assets", "labels.txt")
INPUT_SIZE  = 224
print("MODEL PATH:", MODEL_PATH)
print("EXISTS:", os.path.exists(MODEL_PATH))
print("LABELS PATH:", LABELS_PATH)
print("LABELS EXISTS:", os.path.exists(LABELS_PATH))
# ── Load model ───────────────────────────────────────────────────────────
interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details  = interpreter.get_input_details()
output_details = interpreter.get_output_details()

with open(LABELS_PATH, "r") as f:
    labels = [l.strip() for l in f if l.strip()]

print(f"✓ Model loaded  — input: {input_details[0]['shape']}, classes: {len(labels)}")
print(f"✓ Labels: {labels}")


def preprocess(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = ImageOps.exif_transpose(img)          # fix phone camera rotation
    img = img.resize((INPUT_SIZE, INPUT_SIZE), Image.LANCZOS)
    arr = np.array(img, dtype=np.float32)
    arr = preprocess_input(arr)          # MobileNetV2: scales to [-1, 1]
    return np.expand_dims(arr, axis=0)   # [1, 224, 224, 3]


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "classes": len(labels)})


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No 'image' field in request"}), 400

    image_bytes = request.files["image"].read()
    input_data  = preprocess(image_bytes)

    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()

    scores        = interpreter.get_tensor(output_details[0]["index"])[0]
    predicted_idx = int(np.argmax(scores))
    confidence    = float(scores[predicted_idx])
    breed         = labels[predicted_idx] if predicted_idx < len(labels) else "Unknown"

    return jsonify({"breed": breed, "confidence": round(confidence, 4)})


if __name__ == "__main__":
    # host="0.0.0.0" makes it reachable from other devices on the same network
    app.run(host="0.0.0.0", port=5000, debug=False)
