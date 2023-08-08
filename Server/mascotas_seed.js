const { Client } = require('pg');
const { sequelize, Mascota, User } = require('./src/db.js'); 
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Configuración de la conexión a la base de datos
const dbConfig = { /*USARÁN SUS VARIABLES CON LAS QUE SE CONECTAN A SU DB*/
  user: DB_USER, 
  host: DB_HOST,  
  database: 'patitas_sin_hogar',
  password: DB_PASSWORD, 
  port: 5432         // Puerto por defecto de PostgreSQL
};

// Datos de las mascotas
const mascotasData = [
  {
    "name": "Max",
    "specie": "Perro",
    "age": "5",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Max es un perro enérgico y cariñoso que siempre está listo para jugar contigo.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Luna",
    "specie": "Perro",
    "age": "3",
    "size": "Grande",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Luna es una perrita dulce y tranquila que adora acurrucarse contigo en el sofá.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Rocky",
    "specie": "Perro",
    "age": "4",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://www.tailwaggerphoto.com/wp-content/uploads/2021/04/Grand-Rapids-Dog-Photographer-2364-1280x853.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Rocky es un perro valiente y aventurero que está listo para explorar el mundo contigo.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Toby",
    "specie": "Perro",
    "age": "6",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Toby es un perro inteligente y curioso que siempre está listo para aprender cosas nuevas.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Charlie",
    "specie": "Perro",
    "age": "5",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Charlie es un perro amigable y cariñoso que se llevará bien con todos en la familia.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Bella",
    "specie": "Perro",
    "age": "5",
    "size": "Grande",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Bella es una perrita elegante y leal que será tu compañera fiel en todas tus aventuras.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Lola",
    "specie": "Perro",
    "age": "5",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Lola es una perra guardiana y llena de energía que te hará reír con sus travesuras.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Rocket",
    "specie": "Perro",
    "age": "8",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": " Rocket es un perro lleno de vitalidad y alegría que te contagiará su entusiasmo.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Daisy",
    "specie": "Perro",
    "age": "6",
    "size": "Grande",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Daisy es una perrita tierna y afectuosa que adora recibir mimos y caricias.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Buddy",
    "specie": "Perro",
    "age": "5",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/pk1AAdloG.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Buddy es un perro leal y protector que cuidará de ti y de tu familia.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Coco",
    "specie": "Perro",
    "age": "4",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/sqQJDtbpY.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Coco es un perro valiente y atlético que siempre está listo para correr y jugar.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Olivia",
    "specie": "Perro",
    "age": "5",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/Bymjyec4m.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Olivia es una perrita cariñosa y juguetona que hará que cada día sea especial.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Eva",
    "specie": "Perro",
    "age": "4",
    "size": "Chico",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thedogapi.com/images/_gn8GLrE6.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Eva es una perra amigable y cariñosa que se llevará bien con todos en la familia.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Maxi",
    "specie": "Perro",
    "age": "5",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/S14n1x9NQ.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Maxi es un perro amigable y cariñoso que se llevará bien con todos en la familia.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Rex",
    "specie": "Perro",
    "age": "4",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://cdn2.thedogapi.com/images/HkC31gcNm.png",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Rex es un perro fuerte y valiente que será tu compañero fiel en todas tus aventuras.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Huma",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Huma es una gatita misteriosa y juguetona que te cautivará con su mirada.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Simba",
    "specie": "Gato",
    "age": "3",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Simba es un gato travieso y carismático que siempre está listo para explorar nuevos lugares.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Mía",
    "specie": "Gato",
    "age": "4",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Mia es una gatita dulce y encantadora que adora pasar tiempo acurrucada a tu lado.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Oliver",
    "specie": "Gato",
    "age": "6",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1599572739984-8ae9388f23b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Oliver es un gato curioso y astuto que siempre está investigando su entorno.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Nala",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://cdn2.thecatapi.com/images/7e4.jpg",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Nala es una gatita cariñosa y tierna que te hará sonreír con sus ocurrencias",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Leo",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1617813480365-9bb7bb45a4c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY0fHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Leo es un gato valiente y aventurero que disfruta explorando cada rincón de tu hogar.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Cleo",
    "specie": "Gato",
    "age": "3",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Cleo es una gatita elegante y distinguida que se robará el corazón de todos.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Pity",
    "specie": "Gato",
    "age": "8",
    "size": "Grande",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=843&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Pity es un gato juguetón y activo que siempre está en movimiento.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Bella",
    "specie": "Gato",
    "age": "6",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1580253784018-8b2c4a9034c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU3fHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Bella es una gatita encantadora y cariñosa que adora recibir caricias.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Charlie",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Charlie es un gato curioso y amigable que se lleva bien con todos.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Lily",
    "specie": "Gato",
    "age": "4",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1596922258747-539808ac401b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMyfHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Lily es una gatita dulce y tranquila que adora los momentos de relax.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Toby",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1576613444363-02397e8357d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI0fHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Toby es un gato travieso y lleno de energía que te hará reír con sus ocurrencias.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Luna",
    "specie": "Gato",
    "age": "4",
    "size": "Chico",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1527986521309-bd797808d073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjk2fHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Luna es una gatita enérgica y cariñosa que siempre está buscando jugar contigo.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Oscar",
    "specie": "Gato",
    "age": "5",
    "size": "Mediano",
    "gender": "Macho",
    "imageUrl": "https://images.unsplash.com/photo-1604788893124-fe5c0e999602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzIyfHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Oscar es un gato inteligente y astuto que te sorprenderá con su ingenio.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  },
  {
    "name": "Chloe",
    "specie": "Gato",
    "age": "3",
    "size": "Mediano",
    "gender": "Hembra",
    "imageUrl": "https://images.unsplash.com/photo-1580253784018-8b2c4a9034c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU3fHxjYXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "location": "https://goo.gl/maps/Bs4g8QU5aenm5upu5",
    "description": "Chloe es una gatita tierna y afectuosa que se convertirá en tu mejor amiga.",
    "email": "nvnsuibsd@yahoo.com",
    "numberPhone": "5789294034"
  }
];

async function seedMascotas() {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    // Iterar sobre los datos y realizar inserciones
    for (const mascota of mascotasData) {
      const newMascota = await Mascota.create({
        name: mascota.name,        
        specie: mascota.specie,
        age: mascota.age,
        size: mascota.size,
        gender: mascota.gender,
        imageUrl: mascota.imageUrl,
        location: mascota.location,
        description: mascota.description,
        email: mascota.email,
        mascota: mascota.numberPhone,
        user_id: mascota.user_id,
      });

      // relación con User (que posteó la mascota)
      const user = await User.findOne({
       where: {
        email: 'email',  
      }});
      if (user) {
        await newMascota.setUserPostPet(user);
      }
    }

    console.log('Seeding completado exitosamente.');
  } catch (error) {
    console.error('Error durante el seeder:', error);
  } finally {
    await client.end();
  }
}

seedMascotas();

/* ------------IMPORTANTE----------- */
/* Instalar dependencia pg si no la tienen, luego ejecutar este comando en la terminal del server; node mascotas_seed.js */