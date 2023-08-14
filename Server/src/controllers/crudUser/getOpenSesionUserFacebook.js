const { User } = require("../../db.js");


const loginUserFacebook = async (id,name,lastName,userName) => {
   try {
        
        const [user , created] = await User.findOrCreate({
            where: { idFacebook: id },
            defaults:{
                idFacebook : id,
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

module.exports = loginUserFacebook;
