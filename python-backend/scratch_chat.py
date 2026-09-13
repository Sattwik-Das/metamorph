import requests
import json

payload = {
    "model": "whatever",
    "max_tokens": 1024,
    "stream": True,
    "system": "Hello",
    "messages": [
        {"role": "user", "content": [{"type": "text", "text": "What is the capital of France?"}]}
    ]
}

r = requests.post("http://127.0.0.1:8000/api/chat", json=payload, stream=True)
for line in r.iter_lines():
    print(line.decode('utf-8'))
