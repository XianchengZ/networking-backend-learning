# Database Sharding Example

## Overview

This project records the topics of sharding and a small example around it.

`start-db` folder contains a docker compose file, to start 3 postgres instances along with a pgadmin.

- each postgres instance has a URL table, the table definition can be found in `start-db/init.sql`.

`node_shard_app_backend` spin up a nodejs server to work with 3 database instances. Moreover, it contains basic sharding techniques to interact with.
