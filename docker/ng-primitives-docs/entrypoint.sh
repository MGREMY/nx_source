#!/bin/sh

# Replace placeholders in config.json with environment variables
envsubst < /usr/share/nginx/html/assets/config.json > /usr/share/nginx/html/assets/config.tmp && \
mv /usr/share/nginx/html/assets/config.tmp /usr/share/nginx/html/assets/config.json

# Start nginx
exec nginx -g 'daemon off;'
