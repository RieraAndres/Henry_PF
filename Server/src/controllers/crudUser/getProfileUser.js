const { User } = require ("../../db.js")

const getUser = async (userName)=>{
    try {
        const user = await User.findOne({where:{userName:userName}})
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getUser;