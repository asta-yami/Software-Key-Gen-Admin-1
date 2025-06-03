const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '12312312j2&Jk'

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
});