const env = process.env.NODE_ENV || 'development';

const CONFIG = Object.freeze({
  env,
  api: process.env.REACT_APP_API,
  GAUTH: {
    CLIENT_ID: process.env.REACT_APP_GAUTH_CLIENT_ID
  },
  ENGATI: 'https://app.engati.com/static/standalone/bot.html?bot_key=05289cbdbec54674',
  PUSHER: process.env.REACT_APP_PUSHER_KEY,
  CLIENT: process.env.REACT_APP_CLIENT
});

export default CONFIG;
