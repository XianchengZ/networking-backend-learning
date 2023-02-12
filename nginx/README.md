# This is the readme for Nginx learning

There are several files that might be confusing.

### Section 1 Basic of NGINX

`nginx.conf` is the mock config file copied paste from local directory to serve a dummy static website.

The source files are taken from `./staticHtmlSite/` and `./images/`.

### Section 2 Layer 7 load balancing

I wasn't able to find `nodeapp` image from docker hub. Therefore, a custom `nodeapp_server` is created for the sake of dummy web server.

We will use the image created with `nodeapp_server` (name would be `nodeapp` after we ran the `./nodeapp_server/build.sh`).

We will start 4 containers with this server with the following commands:

- `docker run -p 2222:9999 -e APPID=2222 -d nodeapp`
- `docker run -p 3333:9999 -e APPID=3333 -d nodeapp`
- `docker run -p 4444:9999 -e APPID=4444 -d nodeapp`
- `docker run -p 5555:9999 -e APPID=5555 -d nodeapp`

Current study timestamp: 35:27

Learning source:
[youtube membership video from Hussein Nasser](https://www.youtube.com/watch?v=hcw-NjOh8r0&list=PLQnljOFTspQX8hkaqYiei8O2mqRIfxBm-&index=10)
