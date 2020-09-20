const LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    jwtSecret = require('../configs/jwtConfig')


//User Model
const UserModel = require('../model/usersmodel')

module.exports = function (passport) {
    // local passport email/password
    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
        }, async (email, password, done) => {
            await UserModel.findOne({ email: email }, (err, user) => {
                if (user)
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch)
                            return done(null, user, { message: 'Logged In Successful' })
                        else
                            return done(null, false, { message: 'Incorrect password' })
                    })
                else
                    return done(null, false, { message: 'Email incorrect' })
                passport.serializeUser((user, done) => {
                    done(null, user.id);
                })
                passport.deserializeUser((id, done) => {
                    UserModel.findById(id, (err, user) => {
                        done(err, user);
                    })
                })
            })
        })
    )
    passport.use(
        'JWT',
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret.secret
        },
            async (jwtPayload, done) => {
                //console.log(jwtPayload)
                //find the user in db if needed
                await UserModel.find({ _id: jwtPayload }).select('-_id -password').
                    exec((err, user) => {
                        console.log(user)
                        if (user) return done(null, user)
                        if (err) return done(err)
                    });

            }
        ));
}