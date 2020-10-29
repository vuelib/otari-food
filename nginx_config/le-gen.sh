#!/usr/bin/env sh
# Entrypoint for a Docker image.

# Setup SSL keys.
echo "ssl_key=${SSL_KEY:=le-key.pem}, ssl_cert=${SSL_CERT:=le-crt.pem}, ssl_chain_cert=${SSL_CHAIN_CERT:=le-chain-crt.pem}"
SSL_KEY=/etc/nginx/ssl/${SSL_KEY}
SSL_CERT=/etc/nginx/ssl/${SSL_CERT}
SSL_CHAIN_CERT=/etc/nginx/ssl/${SSL_CHAIN_CERT}

# Replace SSL_KEY, SSL_CERT and SSL_CHAIN_CERT by actual keys.
sed -i "s|SSL_KEY|${SSL_KEY}|g" /etc/nginx/conf.d/*.conf
sed -i "s|SSL_CERT|${SSL_CERT}|g" /etc/nginx/conf.d/*.conf
sed -i "s|SSL_CHAIN_CERT|${SSL_CHAIN_CERT}|g" /etc/nginx/conf.d/*.conf

# Generate dhparams.pem
if [ ! -f /etc/nginx/ssl/dhparams.pem ]; then
  echo "Make dhparams"
  cd /etc/nginx/ssl
  openssl dhparam -out dhparams.pem 2048
fi

# Disable SSL configuration to prevent start errors.
mv /etc/nginx/conf.d /etc/nginx/conf.d.disabled

(
  sleep 10 # Give NGinx time to start.
  echo "Start LetsEncrypt updater"
  while :
  do
    echo "Trying to update LetsEncrypt..."
    le.sh
    mv /etc/nginx/conf.d.disabled /etc/nginx/conf.d # Enable custom config back.
    echo "Reload NGinx with SSL"
    nginx -s reload
    sleep 60d
  done
) &
start-nginx.sh
