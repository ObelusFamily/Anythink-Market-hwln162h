import sys
import os
import openai

openai.api_key = os.getenv('OPENAI_API_KEY')


def get_url_image_openai(str_title: str) -> str:
    try:
        response = openai.Image.create(
          prompt=str_title,
          n=1,
          size='256x256'
        )
    except Exception as ex:
        return "erro"

    return  response['data'][0]['url']