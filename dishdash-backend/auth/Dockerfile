FROM python:3-alpine3.10
WORKDIR /dishdash
COPY ./requirements.txt /dishdash
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["python", "app.py"]