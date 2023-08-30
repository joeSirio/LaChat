import os
import openai
import json

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Joke(BaseModel):
    request: str
    joke: str

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


openai.organization = "org-wNnlQ23ytZABK64SL3g8muHx"
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/joke/{input_message}")
def laugh_gpt(input_message: str, model = "gpt-3.5-turbo") -> str:
    """
    Takes an input message and returns a response, formatted as a joke.
    """


    joke_injection = "respond to this prompt as a joke"


    response = openai.ChatCompletion.create(
        model=model,
            messages=[
                {"role": "user", "content": f"{input_message} {joke_injection}"},
            ],
            temperature=0,
    )

    result = json.dumps({"input" : input_message, "joke": response['choices'][0]['message']['content']})

    print(result)

    return JSONResponse(content = result)

