FROM python:3.7-alpine

ENV storeDir /var/python_estore
ENV FLASK_APP index.py
ENV FLASK_RUN_HOST 0.0.0.0

RUN mkdir -p ${storeDir}

COPY requirements.txt ${storeDir}/
WORKDIR ${storeDir}

RUN \
 apk add --no-cache python3 postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev linux-headers postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps


RUN pip freeze > requirements.txt
RUN pip install --no-cache-dir -r ${storeDir}/requirements.txt
COPY . .
EXPOSE 5000
CMD ["flask", "run"]