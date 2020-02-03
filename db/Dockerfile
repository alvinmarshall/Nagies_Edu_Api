FROM mysql:5.7

ENV MYSQL_DATABASE nagies_db
ENV MYSQL_ROOT_PASSWORD toor
ENV MYSQL_USER mysql
ENV MYSQL_PASSWORD toor
ENV DATABASE_HOST db

EXPOSE 3306

COPY ./CreateTables.sql /docker-entrypoint-initdb.d/