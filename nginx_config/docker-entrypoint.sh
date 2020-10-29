if [ "$NODE_ENV" == "production" ]; \
    then \
    start-nginx.sh; \
    else \
    le-gen.sh; \
    fi