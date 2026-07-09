#!/usr/bin/env ruby
#
# Set each post's `last_modified_at` from its git history so posts show an
# "Updated" date. We follow renames (`git log --follow`) so posts relocated
# into _posts — e.g. the write-ups moved out of the old _writeups collection —
# still count their full history and get an "Updated" date consistent with the
# blog/project posts, instead of looking brand-new at their current path.

Jekyll::Hooks.register :posts, :post_init do |post|
  commit_count = `git log --follow --format=%h -- "#{ post.path }"`.lines.count

  if commit_count > 1
    lastmod_date = `git log --follow -1 --pretty="%ad" --date=iso -- "#{ post.path }"`.strip
    post.data['last_modified_at'] = lastmod_date unless lastmod_date.empty?
  end
end
