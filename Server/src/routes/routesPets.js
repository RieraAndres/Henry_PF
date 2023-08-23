const { Router } = require("express");
const routerPets = Router();

const {
  handlerAllPets,
  handlerPostPet,
  handlerIdPet,
  handlerPutPets,
  handlerLogicDeletePets,
  handlerDeletePets,
  handlerEnableOrDisablePet,
  handlerMyPost,
} = require("../handlers/handlerPets");
const { handlerSortAndFilter } = require("../handlers/handlerSortAndFilter");
const {
  handlerAdoptPet,
  handlerAllAdoptInfo,
} = require("../handlers/handlerAdopt");

routerPets.get("/", handlerAllPets); //trae todos los pets y por nombre segun condicional //OK pero unicamente por modelo mascota
routerPets.get("/filter", handlerSortAndFilter); // filtrado y ordenado
routerPets.get("/adopt", handlerAllAdoptInfo); //accede a la info de los adoptados
routerPets.post("/:id/adopt", handlerAdoptPet); //solicitud de posteo para adoptar una mascota
routerPets.get("/mispublicaciones/:id", handlerMyPost);
routerPets.get("/:id", handlerIdPet); //trae todas las mascotas por id
routerPets.post("/", handlerPostPet); //post de los pets //OK pero unicamente por modelo mascota
routerPets.put("/:id", handlerPutPets); // Modifica  los datos de una mascota (Marcos)
routerPets.put("/disable/:id", handlerLogicDeletePets); // Borrado lógico, se desactiva para que no se muestre(manejar eso en el front)
routerPets.delete("/delete/:id", handlerDeletePets); // Borra el registro de la mascota de la base de datos
routerPets.put("/status/:id", handlerEnableOrDisablePet);

module.exports = routerPets;
