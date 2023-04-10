import sys
import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')


def get_url_image_openai(str_title: str) -> str:
    try:
        response = openai.Image.create(
          prompt=str_title,
          size='256x256'
        )
    except Exception as ex:
        print(ex)
        return "erro"

    return  response['data'][0]['url']