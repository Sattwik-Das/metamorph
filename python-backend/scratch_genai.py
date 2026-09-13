import os
import base64
from google import genai
from google.genai import types

def test():
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "DUMMY"))
    print(dir(types.Part))

test()
