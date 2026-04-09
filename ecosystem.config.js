module.exports = {
  apps: [{
    name: 'manshin',
    script: 'node_modules/.bin/next',
    args: 'start -p 3040',
    cwd: '/var/www/manshin',
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
