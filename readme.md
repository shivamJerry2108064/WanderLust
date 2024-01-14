# MEGA_PROJECT_1

# MEGA_PROJJECT_1_PHASE_E (till flash and sessions)


# MEGA_PROJECT_1_PHASE_F & "APNA COLLEGE PHASE 2 PART D"
   
   # IMPORTANT TERMS AND DEFINATIONS WE NEED TO KNOW IN THIS SECTION 

   1) AUTHENTICATION
   => authentication is the process of verifying who someone is .
   2) AUTHORIZATION 
   => authorization is the process of verifying what specific application, files and data a use has access to.

   <!-- authentication se verify krlia apna college ne username and password leke ki mai hi hu aoni id se and then dekha ki ye banda kya kya access kr skta h jaise "delta batch access h " . -->

   # HOW TO STORE PASSWORDS ON SIGN UP
   => we never store the passwords as it is. we store their hashed form.

   password(input)  => [hashing function] => string(hashed form and it is an output).

   # HOW TO VERIFY PASSWORDS WHILE LOGING IN 
   => when user enter his/her password while login then password and again converted to hashed form and then it is matched with th stored hashed form and completes the authentication process..

   # SOME IMPORTANT POINTS NEED TO KNOW OVER HASHING FUNCTION

   => for every input, there is a fixed output.
   => they are one-way functions, we can't get input from output.
   => for a different input, there is a different output but of same length.
   => small changes in input can bring large changes in output.

   # some example of hashing functions 
   => SHA256, MD5, CRC, bcrypt.

   ----------------------------------------------------------------------------------------------------------------------------------------------

   3) SALTING 
   => password salting is a technique to protect passwords stored in databases by adding a string of 32 or more and then hashing them.

         => (password) -> (password + salt) -> hashed it and then stored in database.

  ------------------------------------------------------------------------------------------------------------------------------------------------

  # PASSPORT
  => passport is a authentication middleware for node.js.
  =>passport's sole purpose is to authenticate requests, which it does through an extensible set of "plugins" known as "strategies".

  # install these npm packages
  => npm i passport
  => npm i passport-local - it is a basic strategy that uses only username & password for authentication by plugin into passport.
  => npm i passport-local-mongoose- it is a mongoose plugin that simplifies building username and passwords.

  ------------------------------------------------------------------------------------------------------------------------------------------------
  # CREATE USER MODEL

  # syntax for .models/user.js
     
     const mongoose=require("mongoose");
     const schema=mongoose.schema;
     const passportLocalMongoose= require("passport-local-mongoose");

     //define your userSchema - you'r free to define your user how it like. passport-local-mongoose will add a username, hash & salt field to store username and hashed password (bydefault). (extra data - we can ask for email,phone number etc).

     userSchema.plugin(passportLocalMongoose);
     module.exports=mongoose.model('User',userSchema);
--------------------------------------------------------------------------------------------------------------------------------------------------

# CONFIGURING STRATEGY
   =>important terms

   1) passport.initialize();
   => a middleware that initializes passport.
   
   2) passport.session();
   => a web application needs the ability to identify user as they browse from page to page of a web application.this series of requests & responses ,each associated with same user is called session.
   (agr same user hamare application ke ek page se dusre page pe jata h to usse relogin na krna pade).

   3) passport.use(new LocalStrategy(User.authenticate()));


   # syntax for appserver.js

   const passport=require("passport");
   const LocalStrategy=require("local-strategy");
   const User=require(./models/user.js);

   app.use(flash());

  |--------------------------------------------------------|
  | app.use(passport.initialize());                        |
  | app.use(passport.session());                           |
  | passport.use(new LocalStrategy(User.authenticate()));  |
  |                                                        |
  | passport.serializeUser(User.serializeUser());          |
  | passport.deserializeUser(User.deserializeUser());      |
  ----------------------------------------------------------   
  -------------------------------------------------------------------------------------------------------------------------------------------------

  # GET REQUEST FOR SIGNUP FORN
  # POST REQUEST TO SAVE IT
  # LOGIN
---------------------------------------------------------------------------------------------------------------------------------------------------
