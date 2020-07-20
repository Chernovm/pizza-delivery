FROM php:7.3-fpm

WORKDIR /var/www/pizza-delivery
COPY ./backend .

RUN docker-php-ext-install mysqli pdo pdo_mysql mbstring

RUN apt-get update && \
    apt-get install -y libzip-dev && \
    apt-get install -y git

RUN docker-php-ext-install zip

# MySQL utilities
RUN apt-get update && apt-get install -y mariadb-client

# Composer
RUN cd ~ && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
        php composer-setup.php && \
        php -r "unlink('composer-setup.php');" && \
        mv composer.phar /usr/local/bin/composer && \
        cd /var/www/pizza-delivery

RUN composer global require hirak/prestissimo

RUN cd /var/www/pizza-delivery
