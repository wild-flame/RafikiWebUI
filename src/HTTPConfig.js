// start script's process.env.NODE_ENV = 'development';
// build script's process.env.NODE_ENV = 'production';
// use different firebase database for different script
// default as development
const HTTPconfig = {
  // the client tells server data-type json is actually sent.
  HTTP_HEADER: {
    "Content-Type": "application/json",
  },
  UPLOAD_FILE: {
    'Content-Type':'multipart/form-data',
  },
  // need a working server for axios uploadprogress to work
  gateway: "http://localhost:5000/",
  // gateway: "http://3.0.229.71/",
}

if (process.env.NODE_ENV === "production") {
  HTTPconfig.gateway = "http://3.0.229.71/";
}

export default HTTPconfig;
