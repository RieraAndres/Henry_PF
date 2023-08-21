const registerUser = require("../controllers/crudUser/postRegisterUser.js");
const getUser = require("../controllers/crudUser/getProfileUser.js");
const loginUser = require("../controllers/crudUser/getOpenSesionUser.js");
const loginUserGoogle = require("../controllers/crudUser/getOpenSesionUserGoogle.js");
const loginUserFacebook = require("../controllers/crudUser/getOpenSesionUserFacebook.js");
const modifyUser = require("../controllers/crudUser/putModifyProfileUser.js");
const createUserPassword = require("../controllers/crudUser/putCreateUserPassword.js");
const getAllUsers = require("../controllers/crudUser/getAllUsers.js");
const deleteUser = require("../controllers/crudUser/deleteUser.js");
const getAllDataOfUser = require("../controllers/crudUser/getAllPetsOfUser.js");
const setAdminUser = require("../controllers/crudUser/setAdminUser.js");

const handlerRegisterUser = async (req, res) => {
  const {
    name,
    lastName,
    email,
    birthdate,
    userName,
    password,
    numberPhone,
    address,
  } = req.body;
  try {
    if (
      !name ||
      !lastName ||
      !email ||
      !birthdate ||
      !userName ||
      !password ||
      !numberPhone ||
      !address
    ) {
      return res.status(400).json({
        error:
          "Revise los campos nuevamente y verifique que todo esté correcto",
      });
    } else {
      const createUserResponse = await registerUser(
        name,
        lastName,
        email,
        birthdate,
        userName,
        password,
        numberPhone,
        address
      );

      if (createUserResponse.error) {
        return res.status(409).json({ error: createUserResponse.error }); // 409 Conflict status code for already existing resource
      }

      return res.status(201).json({ message: "Usuario creado con éxito" });
    }
  } catch (error) {
    console.error("Ocurrió un error al crear su cuenta de usuario", error);
    return res
      .status(500)
      .json({ error: "Error al crear su cuenta de usuario" });
  }
};

const handlerUserData = async (req, res) => {
  const { userName } = req.query;
  try {
    if (!userName) {
      return res.status(400).json({ error: "Ingrese nombre de usuario" });
    } else {
      const userData = await getUser(userName);
      if (userData) {
        return res.status(201).json(userData);
      } else {
        return res
          .status(400)
          .json({ error: "No existe usuario con ese UserName" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleUserLogin = async (req, res) => {
  let { userName, password } = req.query;
  try {
    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Ingrese un usuario y una contraseña" });
    } else {
      let logedIn = await loginUser(userName, password);
      if (logedIn) {
        return res.status(200).json(logedIn);
      } else {
        return res
          .status(400)
          .json({ error: "Usuario o Contraseña no coinciden" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleUserLoginGoogle = async (req, res) => {
  let { email, name, lastName, userName } = req.query;
  try {
    if (!email || !name || !lastName || !userName) {
      return res.status(400).json({ error: "Ingrese todos los datos" });
    } else {
      let logedInGoogleUser = await loginUserGoogle(
        email,
        name,
        lastName,
        userName
      );
      return res.status(200).json(logedInGoogleUser);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleUserLoginFacebook = async (req, res) => {
  let { id, name, lastName, userName } = req.query;
  try {
    if (!id || !name || !lastName || !userName) {
      return res.status(400).json({ error: "Ingrese todos los datos" });
    } else {
      let logedInFacebookUser = await loginUserFacebook(
        id,
        name,
        lastName,
        userName
      );
      return res.status(200).json(logedInFacebookUser);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handlerModifyUser = async (req, res) => {
  let {
    email,
    name,
    lastName,
    userName,
    birthdate,
    address,
    numberPhone,
    DBpassword,
    userActualPassword,
    userNewPassword,
  } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Ingrese el Email" });
    } else {
      let modifiedUser = await modifyUser(
        email,
        name,
        lastName,
        userName,
        birthdate,
        address,
        numberPhone,
        DBpassword,
        userActualPassword,
        userNewPassword
      );
      return res.status(200).json(modifiedUser);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleCreateUserPassword = async (req, res) => {
  let { idFacebook, email, createdPassword, createdEmail } = req.body;
  try {
    if (!idFacebook && !email && !createdPassword && !createdEmail) {
      return res.status(400).json({ error: "Ingrese los datos" });
    } else if (!createdPassword) {
      return res.status(400).json({ error: "Ingrese los datos" });
    } else if (!email && !idFacebook) {
      return res.status(400).json({ error: "Ingrese un email o idFacebook" });
    } else if (email && idFacebook) {
      return res
        .status(400)
        .json({ error: "Ingrese solo un email o idFacebook" });
    } else if (idFacebook && !createdEmail) {
      return res.status(400).json({ error: "Ingrese un email" });
    } else {
      let userWithPassword;
      if (email) {
        userWithPassword = await createUserPassword({ email, createdPassword });
      } else if (idFacebook) {
        userWithPassword = await createUserPassword({
          idFacebook,
          createdPassword,
          createdEmail,
        });
      }
      return res.status(200).json(userWithPassword);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json("Ingrese un id");
    }
    const user = await deleteUser(id);
    if (user === 1) {
      return res.status(200).json(`Usuario con ID:${id} eliminado`);
    } else {
      return res.status(400).json("Eliminacion fallida");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleGetAllDataOfUser = async (req, res) => {
  const { id } = req.query;
  try {
    const pets = await getAllDataOfUser(id);
    if (pets === null || pets.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      return res.status(200).json(pets);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const handleSetAdminUser = async (req, res) => {
  const { id } = req.body;
  try {
    const adminUser = await setAdminUser(id);
    return res.status(200).json(adminUser);
  } catch (error) {
    console.error("Ocurrió un error al actualizar el tipo de usuario");
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
};
