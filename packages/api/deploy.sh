#!/bin/bash
/var/docker/deploy/deploy.sh >> /var/docker/logs/sh/`date -u +\%Y\%m\%d.\%H\%M.log` 2>&1 &