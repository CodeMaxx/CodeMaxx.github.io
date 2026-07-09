# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll-theme-chirpy", "~> 7.6"

# Plugins retained from the previous setup (not bundled by Chirpy):
#   jemoji             — renders :emoji: shortcodes used in posts
#   jekyll-mentions    — renders @username GitHub mentions
#   jekyll-redirect-from — `redirect_to` front matter for external-link posts
group :jekyll_plugins do
  gem "jemoji"
  gem "jekyll-mentions"
  gem "jekyll-redirect-from"
end

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
