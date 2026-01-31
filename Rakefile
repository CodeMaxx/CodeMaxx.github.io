require 'html-proofer'
require 'yaml'

# rake test
desc "build and test website"

task :test do
  sh "bundle exec jekyll build"
  
  # Load config from YAML file
  config = YAML.load_file('.htmlproofer.yaml')
  
  options = {
    allow_hash_href: config['allow_hash_href'] || true,
    allow_missing_href: config['allow_missing_href'] || false,
    typhoeus: {
      headers: {
        "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language" => "en-US,en;q=0.5"
      },
      connecttimeout: 30,
      timeout: 60,
      ssl_verifypeer: true,
      followlocation: true
    },
    hydra: {
      max_concurrency: 10
    }
  }
  
  # Convert ignore_urls strings to regexes
  if config['ignore_urls']
    options[:ignore_urls] = config['ignore_urls'].map do |pattern|
      if pattern.start_with?('/') && pattern.end_with?('/')
        Regexp.new(pattern[1..-2])
      else
        pattern
      end
    end
  end
  
  # Convert ignore_files strings to regexes
  if config['ignore_files']
    options[:ignore_files] = config['ignore_files'].map do |pattern|
      if pattern.start_with?('/') && pattern.end_with?('/')
        Regexp.new(pattern[1..-2])
      else
        pattern
      end
    end
  end
  
  HTMLProofer.check_directory('./_site', options).run
end
