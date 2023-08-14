const { User } = require("../../db.js");

const loginUserGoogle = async (email,name,lastName,userName) => {
   try {
        const [user , created] = await User.findOrCreate({
            where: { email: email },
            defaults:{
                email,
                name,
                lastName,
                userName
            }
             });
        if (user) {
                return user; // Devuelve el usuario si el usuario ya se habia logueado antes con ese mail
            } 
        if(!created){
            return user;
        }
   } catch (error) {
     throw new Error(error.message);
   }
};

module.exports = loginUserGoogle;
