FROM ruby:2.6-alpine3.10

RUN apk --update add g++ musl-dev make

RUN gem install bundler

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

# Entrypoint is the steady thing, CMD can be easily override in docker run
# Final command is the combo of entrypoint and cmd
ENTRYPOINT ["jekyll"]
CMD ["build"]

# Build this Docker image
# docker build -t runbuilder .
# Use Docker image to build _site, no drafts
# docker run -it --mount type=bind,source="$(pwd)",target=/app/ runbuilder
# Use Docker image to build _site, with drafts (everything after image name seems to override CMD?)
# docker run -it --mount type=bind,source="$(pwd)",target=/app/ runbuilder build --drafts
