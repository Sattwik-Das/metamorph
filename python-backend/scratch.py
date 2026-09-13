import asyncio
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

async def main():
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    try:
        response_stream = await client.aio.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents="Hi"
        )
        async for chunk in response_stream:
            print(chunk.text)
    except Exception as e:
        print(f"Failed await: {e}")
        response_stream = client.aio.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents="Hi"
        )
        async for chunk in response_stream:
            print(chunk.text)

asyncio.run(main())
