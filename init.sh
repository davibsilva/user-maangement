#!/bin/bash

# Wait for MySQL to start
echo "Waiting for MySQL to start..."
echo "CREATE USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';" | mysql -u root -p"$MYSQL_ROOT_PASSWORD"
echo "GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_USER'@'%' WITH GRANT OPTION;" | mysql -u root -p"$MYSQL_ROOT_PASSWORD"
echo "FLUSH PRIVILEGES;" | mysql -u root -p"$MYSQL_ROOT_PASSWORD"