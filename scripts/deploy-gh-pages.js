const ghpages = require('gh-pages');

// replace with your repo url
ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    repo: 'git@github.com:tusharpandey13/tusharpandey13.github.io.git',
  },
  () => {
    console.log('Deploy Complete!');
  }
);
