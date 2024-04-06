FROM python:3-alpine3.10
WORKDIR /dishdash
COPY ./requirements.txt /dishdash
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5008
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host", "0.0.0.0"]