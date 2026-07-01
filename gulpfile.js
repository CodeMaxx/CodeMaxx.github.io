import gulp from 'gulp';
import browserSyncLib from 'browser-sync';
import { spawn } from 'node:child_process';

const browserSync = browserSyncLib.create();

const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Build the site (development config) for the local live-reload server.
function jekyllBuild(done) {
    browserSync.notify(messages.jekyllBuild);
    spawn('bundle', ['exec', 'jekyll', 'build', '--drafts', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'}).on('close', done);
}

function jekyllRebuild(done) {
    browserSync.reload();
    done();
}

function browserSyncTask(done) {
    browserSync.init({
        server: { baseDir: "_site/" },
        open: false
    }, done);
}

function watchTask(done) {
    gulp.watch(['_drafts/*', '_includes/*', '_layouts/*', '_posts/*', '*.{html,md}', '_config.yml', '_writeups/*','_writeups/*/*','_writeups/*/*/*'], gulp.series(jekyllBuild, jekyllRebuild));
    done();
}

// Local live-reload dev server. Image optimization is NOT part of local dev;
// it runs against the built _site during deploy (scripts/optimize-images.mjs).
export default gulp.series(jekyllBuild, browserSyncTask, watchTask);
