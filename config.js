require('dotenv').config();


if (process.env.NODE_ENV === 'prod') {

  exports.PORT = process.env.PORT || 80;
  exports.CLIENT_ID = process.env.CLIENT_ID;
  exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
  exports.MONGO_URI = process.env.MONGO_URI;
  exports.CLIENT_URL = process.env.CLIENT_URL;
  exports.SERVER_URL = process.env.SERVER_URL;
  exports.cookie = {
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
    cookie: {
      secure: true, // required for cookies to work on HTTPS
      httpOnly: false,
      sameSite: 'none'
    }
  };
}
if (process.env.NODE_ENV === 'dev') {

  exports.PORT = process.env.PORT || 5000;
  exports.CLIENT_ID = process.env.CLIENT_ID;
  exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
  exports.MONGO_URI = process.env.MONGO_URI;
  exports.CLIENT_URL = process.env.CLIENT_URL;
  exports.SERVER_URL = process.env.SERVER_URL;
  exports.cookie = { secret: "secret", resave: true, saveUninitialized: true }

}

if (process.env.NODE_ENV === 'test') {
  exports.PORT = process.env.PORT || 5000;
  exports.CLIENT_ID = process.env.CLIENT_ID;
  exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
  exports.MONGO_URI = process.env.MONGO_URI;
  exports.CLIENT_URL = process.env.CLIENT_URL;
  exports.SERVER_URL = process.env.SERVER_URL;
  exports.cookie = { secret: "secret", resave: true, saveUninitialized: true }
}