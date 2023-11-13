FROM ruby:3.0.1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# move to the /api dir inside the container
WORKDIR /api
# copy the content on the current directory to the directory in which im currentlly working on the container (/api)
COPY . .
# COPY locationOnHost locationOnContainer
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]