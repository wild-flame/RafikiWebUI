// start script's process.env.NODE_ENV = 'development';
// build script's process.env.NODE_ENV = 'production';
// use different firebase database for different script
// default as development
const HTTPconfig = {
  // the client tells server data-type json is actually sent.
  HTTP_HEADER: {
    "Content-Type": "application/json",
  },
  gateway: "http://localhost:5000/",
}

if (process.env.NODE_ENV === "production") {
  HTTPconfig.gateway = "http://some-aws-ip";
}

export default HTTPconfig;