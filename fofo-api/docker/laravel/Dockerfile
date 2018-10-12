FROM nginx

RUN apt-get update -y && apt-get upgrade 
RUN apt-get install -y curl apt-transport-https lsb-release ca-certificates wget
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list
RUN apt-get update -y

RUN apt-get -y --no-install-recommends install \
  php7.2-cli \
  php7.2-fpm \
  php7.2-mysql \
  php7.2-curl \
  php7.2-json \ 
  php7.2-gd \
  # php7.2-mcrypt \
  php7.2-msgpack \ 
  php7.2-memcached \ 
  php7.2-intl \ 
  php7.2-sqlite3 \ 
  php7.2-gmp \ 
  php7.2-geoip \
  php7.2-mbstring \
  php7.2-xml \
  php7.2-zip

RUN sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" /etc/php/7.2/fpm/php.ini
RUN sed -i "s/user  nginx/user  www-data/" /etc/nginx/nginx.conf
RUN sed -i "s/worker_processes  1/worker_processes  4/" /etc/nginx/nginx.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ADD ./start-app.sh /usr/local/bin/start-app.sh

WORKDIR /var/www/laravel
CMD /usr/local/bin/start-app.sh

EXPOSE 80 443