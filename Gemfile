source 'https://rubygems.org'

# Standalone Jekyll (latest). This site deploys via GitHub Actions
# (.github/workflows/jekyll-gh-pages.yml), not the classic GitHub Pages
# builder, so the pinned `github-pages` meta-gem is not required.
gem 'jekyll', '~> 4.4'

# Jekyll plugins (must match the `plugins:` list in _config.yml)
group :jekyll_plugins do
  gem 'jekyll-feed'
  gem 'jemoji'
  gem 'jekyll-mentions'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
end

# Tooling
gem 'rake', '~> 13.3'
gem 'rouge'
gem 'html-proofer'

# Required for Ruby 3.0+ local serving
gem 'webrick'

# Required for Faraday v2.0+ retry middleware (used by jekyll-github-metadata)
gem 'faraday-retry'

# Windows / JRuby do not include timezone data
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
