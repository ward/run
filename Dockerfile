FROM ruby:2.6-alpine3.10

RUN apk --update add g++ musl-dev make

RUN gem install bundler

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

CMD jekyll build

# docker build -t runbuilder .
# docker run -it --mount type=bind,source="$(pwd)",target=/app/ runbuilder
