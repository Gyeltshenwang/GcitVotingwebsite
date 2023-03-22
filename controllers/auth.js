import Users from "../models/auth.js";
import jwt from "jsonwebtoken";
import cookie from 'cookie-parser';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    }
});
export const getRegistered = (req, res, next) => {
    let message = req.flash('error');
    console.log(message)
    //console.log(req.flash('success'));
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('signup/registration', {
        errorMessage: message
        //successMessage:
    })
    // res.status(200).json({message:'Welcome to RegistrationPage'})
}
export const getLogin = (req, res, next) => {
    //console.log(req.flash('error'));
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('signup/login', {
        errorMessage: message
        //req.flash('error')
    })
}
export const getReset = (req, res) => {
    res.render('signup/reset')
}
export const postRegistered = function (req, res) {
    const { username, email, password, role } = req.body;
    Users.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log('email already exists');
                req.flash('error', 'Email Already Exists');

                return res.redirect('/registration');// user with same email exist 
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new Users({
                        username,
                        email,
                        role,
                        password: hashedPassword,
                        emailToken: crypto.randomBytes(64).toString('hex'),
                        isVarified: false
                    });
                    console.log(user)
                    user.save();
                    let details = {
                        from: 'wangdigyeltshen2@gmail.com',
                        to: req.body.email,
                        subject: 'Wang Di11',
                        text: 'Hello, Wang Di11!',
                        html: `
                        <p> verify your account</p>
                     <a href = "http://localhost:3000/verify/${user.emailToken}">Chick here to get verified!!</a>
    `
                    }
                    transporter.sendMail(details, (err) => {
                        if (err) { console.log('error sending mail', err) } else {
                            console.log('success sending mail')
                        }

                    });
                })

                .then(result => {

                    req.flash('error', 'Verify Your Account');
                    res.redirect('/registration');

                })
                .catch(err => {
                    console.log(err)
                });
        })

        .catch(err => {
            console.log(err)

        });

};

//verify
export const getVerify = async (req, res) => {
    const { emailToken } = req.params
    const user = await Users.findOne({ emailToken: emailToken })

    if (user) {
        
        user.isVarified = true
        await user.save()
        res.redirect('/login')
        
       
    }
}



// user login 

export const postLogin = (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log(req.session.user.role)
                        if (req.session.user.role === 'admin') {
                            return req.session.save(err => {
                                console.log(err);
                                res.redirect('/admin');
                            });
                        } else {
                            return req.session.save(err => {
                                console.log(err);
                                res.redirect('/voters');
                            });
                        }
                    }
                    req.flash('error', 'Invalid email or password.');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};
//PASSWORD RESETTING
export const postReset = (req, res, next) => {

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            res.redirect('/reset')
        }
        const token = buffer.toString('hex');
        Users.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    console.log('No account  found');
                    res.redirect('/reset')
                }
                // check the reset token
                user.resetToken = token;
                user.resetTokenExpire = Date.now() + 3600000;
                return user.save();
                // if reset token exists then 
            })
            .then(result => {
                //redirect to same page
                res.redirect('/')
                let details = {
                    from: 'wangdigyeltshen2@gmail.com',
                    to: req.body.email,
                    subject: 'Wang Di11',
                    text: 'Hello, Wang Di11!',
                    html: `
          <p> you requested reset password</p>
                   <p> click link "http://localhost:3000/reset/${token}"set a new password </p>`
                }
                transporter.sendMail(details, (err) => {
                    if (err) { console.log('error sending mail', err) } else { console.log('success sending mail') }
                });
            })
            .catch(err => {
                console.log(err);
            })
    })
}

// RESER TOKEN FOR PASSWORD 
export const getNewPassword = (req, res, next) => {
    const token = req.params.token;
    Users.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } })
        .then(user => {
            res.render('signup/newPassword', {
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            colsole.log(err);
        });
}
// POST NEW TOKEN
export const postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    Users.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};
