const registerUser = require('../controllers/crudUser/postRegisterUser.js');
const getUser = require('../controllers/crudUser/getProfileUser.js')
const loginUser = require ('../controllers/crudUser/getOpenSesionUser.js')

const handlerRegisterUser = async (req, res) => {
    const { name, lastName, email, birthdate, userName, password, numberPhone, address } = req.body;
    try {
        if (!name || !lastName || !email || !birthdate || !userName || !password || !numberPhone || !address) {
            return res.status(400).json({ error: 'Revise los campos nuevamente y verifique que todo esté correcto' });
        } else {
            const createUserResponse = await registerUser(name, lastName, email, birthdate, userName, password, numberPhone, address);

            if (createUserResponse.error) {
                return res.status(409).json({ error: createUserResponse.error }); // 409 Conflict status code for already existing resource
            }

            return res.status(201).json({ message: 'Usuario creado con éxito' });
        }
    } catch (error) {
        console.error('Ocurrió un error al crear su cuenta de usuario', error);
        return res.status(500).json({ error: 'Error al crear su cuenta de usuario' });
    }
};


const handlerUserData = async (req,res)=>{
    const {userName} = req.query
    try {
        if(!userName){
            return res.status(400).json({error: 'Ingrese nombre de usuario'})
        }else{
            const userData = await getUser(userName)
            if(userData){
                return res.status(201).json(userData)
            }else{
                return res.status(400).json({error:'No existe usuario con ese UserName'})
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const handleUserLogin = async (req,res)=>{
    let {userName,password} = req.query
    try {
        if(!userName || !password){
            return res.status(400).json({error: 'Ingrese un usuario y una contraseña'})
        }else{
            let logedIn = await loginUser(userName,password)
            if(logedIn){
                return res.status(200).json(logedIn)
            }else{
                return res.status(400).json({error: 'Usuario o Contraseña no coinciden'})
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {handlerRegisterUser , handlerUserData,handleUserLogin};
