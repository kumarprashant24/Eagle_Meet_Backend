require('dotenv').config();

console.log();

if (process.env.NODE_ENV === 'prod') {

  exports.PORT = process.env.PORT || 80;
  exports.CLIENT_ID = process.env.CLIENT_ID;
  exports.CLIENT_SECRET = process.env.CLIENT_SECRET;
  exports.MONGO_URI = process.env.MONGO_URI;
  exports.CLIENT_URL = process.env.CLIENT_URL;
  exports.SERVER_URL = process.env.SERVER_URL;
  exports.cookie = {
    secret: 'Session Secret',
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 100,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };
}
if (process.env.NODE_ENV === 'dev') {

    exports.PORT = process.env.PORT || 5000;
    exports.CLIENT_ID = '911683311399-7ndq0oc584d5v1jjgj7gac0p89bts06s.apps.googleusercontent.com';
    exports.CLIENT_SECRET ='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'
    exports.MONGO_URI ='mongodb+srv://prashant24:Prince24@cluster0.2pd6v.mongodb.net/eagle_meet?retryWrites=true&w=majority'
    exports.CLIENT_URL = 'http://localhost:3000'
    exports.SERVER_URL = 'http://localhost:5000'
    exports.cookie = { secret: "secret", resave: true, saveUninitialized: true }
  
  }
  
  if (process.env.NODE_ENV === 'test') {
    exports.PORT = process.env.PORT || 5000;
    exports.CLIENT_ID = '911683311399-7ndq0oc584d5v1jjgj7gac0p89bts06s.apps.googleusercontent.com';
    exports.CLIENT_SECRET ='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'
    exports.MONGO_URI ='mongodb+srv://prashant24:Prince24@cluster0.2pd6v.mongodb.net/eagle_meet?retryWrites=true&w=majority'
    exports.CLIENT_URL = 'http://localhost:3000'
    exports.SERVER_URL = 'http://localhost:5000'
    exports.cookie = { secret: "secret", resave: true, saveUninitialized: true }
  }