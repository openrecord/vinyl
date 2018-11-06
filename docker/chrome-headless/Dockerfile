FROM ubuntu:16.04

RUN apt-get update && apt-get clean && apt-get install -y \
    wget \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update && apt-get -y install google-chrome-stable

EXPOSE 9222

CMD /usr/bin/google-chrome --no-sandbox --disable-gpu --headless --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222