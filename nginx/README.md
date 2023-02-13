# This is the readme for Nginx learning

There are several files that might be confusing.

### Section 1 Basic of NGINX

Everthing found in `./serveStatic/` folder.

`./serveStatic/nginx.conf` is the mock config file copied paste from local directory to serve a dummy static website.

The source files are taken from `./serveStatic/staticHtmlSite/` and `./serveStatic/images/`.

### Section 2 Layer 7 load balancing

Everything found in `layer7-load-balancing-node-example` folder.

I wasn't able to find `nodeapp` image from docker hub. Therefore, a custom `nodeapp_server` is created for the sake of dummy web server.

We will use the image created with `nodeapp_server` (name would be `nodeapp` after we ran the `./nodeapp_server/build.sh`).

To start four containers at the same time, just run the `run4Contianers.sh` within this directory.

The `nginx.conf` file can be found as well.

Current study timestamp: 43:16

Learning source:
[youtube membership video from Hussein Nasser](https://www.youtube.com/watch?v=hcw-NjOh8r0&list=PLQnljOFTspQX8hkaqYiei8O2mqRIfxBm-&index=10)
