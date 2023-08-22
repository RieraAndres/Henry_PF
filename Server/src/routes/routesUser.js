const { Router } = require("express");
const routerForUsers = Router();

const {
  handlerRegisterUser,
  handlerUserData,
  handleUserLogin,
  handleUserLoginGoogle,
  handleUserLoginFacebook,
  handlerModifyUser,
  handleCreateUserPassword,
  handleGetAllUsers,
  handleDeleteUser,
  handleGetAllDataOfUser,
  handleSetAdminUser,
} = require("../handlers/handlerUsers.js");

routerForUsers.post("/userLog", handlerRegisterUser); // Crea el registro para un usuario nuevo en la base de datos(crea una cuenta)
routerForUsers.get("/userData", handlerUserData); //trae la informacion del usuario
routerForUsers.get("/userLogin", handleUserLogin); //devuelve el usuario si el usuario existe y la contraseña igresada es correcta
routerForUsers.get("/loginGoogle", handleUserLoginGoogle); //siempre devuelve usuario ya sea que fue creado o ya existia de Google
routerForUsers.get("/loginFacebook", handleUserLoginFacebook); ////siempre devuelve usuario ya sea que fue creado o ya existia de Facebook
routerForUsers.put("/userUpdate", handlerModifyUser); // modifica y devuelve el usuario ya modificado
routerForUsers.put("/createUserPassword", handleCreateUserPassword); //crea la contraseña a los usuarios que son de google o facebook y si quiere mpdifica datos de usuario
routerForUsers.get("/users", handleGetAllUsers); //Trae todos los usuarios cargados en la DB
routerForUsers.delete("/deleteUser", handleDeleteUser); //Eliminda de la DB el usuario
routerForUsers.get("/dataOfUser", handleGetAllDataOfUser); //Obtiene lista de usuarios con sus posteos de mascotas
routerForUsers.put("/changeType", handleSetAdminUser); //Ruta que cambia el tipo de usuario de adopter a Admin

module.exports = routerForUsers;
