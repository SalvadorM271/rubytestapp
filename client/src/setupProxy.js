const { createProxyMiddleware } = require("http-proxy-middleware");

// all calls beginning with “/api” reach to localhost:3001 

module.exports = function (app) {
  app.use(createProxyMiddleware("/api", { target: "http://localhost:3001" }));
};
