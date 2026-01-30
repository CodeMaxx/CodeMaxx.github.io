import gulp from 'gulp';
import browserSyncLib from 'browser-sync';
import plumber from 'gulp-plumber';
import { spawn } from 'child_process';
import changed from 'gulp-changed';

// images
import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin';

const browserSync = browserSyncLib.create();

const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

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

function imageminTask() {
    return gulp.src('assets/images/**/*.{jpg,png,gif}')
        .pipe(changed('assets/images'))
        .pipe(plumber())
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({ progressive: true }),
            optipng({ optimizationLevel: 3 })
        ]))
        .pipe(gulp.dest('assets/images'));
}

function watchTask(done) {
    gulp.watch('src/images/**/*.{jpg,png,gif}', gulp.series(imageminTask));
    gulp.watch(['_drafts/*', '_includes/*', '_layouts/*', '_posts/*', '*.{html,md}', '_config.yml', '_writeups/*','_writeups/*/*','_writeups/*/*/*'], gulp.series(jekyllBuild, jekyllRebuild));
    done();
}

// Export tasks
export { imageminTask as imagemin };
export default gulp.series(imageminTask, jekyllBuild, browserSyncTask, watchTask);
