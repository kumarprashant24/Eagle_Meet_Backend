require('dotenv').config();

if (process.env.NODE_ENV === 'prod') {

  exports.PORT = process.env.PORT || 80;
}
if (process.env.NODE_ENV === 'dev') {

    exports.PORT = process.env.PORT || 5000;
  
  }
  
  if (process.env.NODE_ENV === 'test') {
    exports.PORT = process.env.PORT || 5000;
 
  }