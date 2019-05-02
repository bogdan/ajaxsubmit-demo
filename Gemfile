source 'http://rubygems.org'

ruby "2.5.1"

gem 'rails'
gem 'pg'

# Bundle the extra gems:
gem 'sorcery'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
group :development, :test do
  gem "test-unit", require: false
  gem "rspec", require: false
  gem 'rspec-rails', require: false
end

group :production do
  gem 'puma', require: false
end
