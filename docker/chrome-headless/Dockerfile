FROM krallin/ubuntu-tini:xenial

RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -yq curl libgconf-2-4

# Install Google Chrome
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get install -y google-chrome-unstable --no-install-recommends && \
  rm -fr /var/lib/apt/lists/* && \
  apt-get purge --auto-remove -y curl && \
  rm -fr /src/*.deb

CMD nohup google-chrome \
  --no-sandbox \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-sync \
  --disable-translate \
  --headless \
  --hide-scrollbars \
  --metrics-recording-only \
  --mute-audio \
  --no-first-run \
  --safebrowsing-disable-auto-update \
  --ignore-certificate-errors \
  --ignore-ssl-errors \
  --ignore-certificate-errors-spki-list \
  --user-data-dir=/tmp \
  --remote-debugging-port=9223 \
  --remote-debugging-address=0.0.0.0