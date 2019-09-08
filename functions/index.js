const functions = require('firebase-functions');
const express = require('express');
const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);//session için
const firebase = require('firebase-admin');//session için

var serviceAccount = require("./serviceAccountKey.json");
const ref = firebase.initializeApp({//session için
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://express-custom-session.firebaseio.com/'
});

const path = require('path');
var expressHbs = require('express-handlebars');
const members = require('./Members');
const middleware_log = require('./middleware/middleware_log');
const router_members = require('./routers/api/Router_members');
const app = express();


  // view engine setup
  app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
  app.set('view engine', '.hbs');

   //session
   app.use(session({
    store: new FirebaseStore({
      database: ref.database()
    }),
    secret: 'Özel-Anahtar',
    resave: false,
    saveUninitialized: true
  }));

  // Body Parser Middleware// json verilerini almak için
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  
  app.use(express.static(path.join(__dirname, 'public')));

 


  //middleware using |
  app.use(middleware_log);



app.get('/',(req,res)=>{
    //res.json(members);
    //res.render('index',{members});

    if (req.session.goruntulenme) {
          req.session.goruntulenme++;
    } else {
      req.session.goruntulenme = 1;
    }
  
    res.send('Sayfa ' + req.session.goruntulenme + ' defa görüntülendi.');
    console.log(req.session);
});

//routing pages |.
app.use('/api/members',router_members);

exports.app = functions.https.onRequest(app);