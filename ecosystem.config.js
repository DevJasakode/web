// pm2 start ecosystem.config.js

module.exports = {
    apps: [{
        name: "web",
        script: "npm",
        args: "start",
        instances: "max",
        exec_mode: "cluster"
    }]
};
