import asyncio
import httpx
import json

async def test_swift_payload():
    payload = {
        "model": "claude-sonnet-4-6",
        "max_tokens": 1024,
        "system": "You are a helpful assistant.",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Hello, how are you?"
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        }
                    }
                ]
            }
        ]
    }
    
    async with httpx.AsyncClient() as client:
        res = await client.post("http://localhost:8000/api/chat", json=payload, timeout=10.0)
        
        full_text = ""
        if res.status_code == 200:
            for line in res.iter_lines():
                if line.startswith("data: "):
                    data_str = line[6:]
                    if data_str == "[DONE]": break
                    data = json.loads(data_str)
                    if data.get("type") == "content_block_delta":
                        full_text += data["delta"]["text"]
            print(f"SUCCESS: Gemini responded with: '{full_text}'")
        else:
            print("FAILED:", res.status_code, res.text)

if __name__ == "__main__":
    asyncio.run(test_swift_payload())
