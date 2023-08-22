const { User } = require("../../db.js");
const { comparePassword, hashPassword } = require("../../passwordUtils/passwordUtils.js");

const modifyUser = async (email, name, lastName, image, userName, birthdate, address, numberPhone, DBpassword, userActualPassword, userNewPassword) => {
    try {
        if (!DBpassword && !userActualPassword && !userNewPassword) {
            const [updatedRowsCount, updatedRows] = await User.update(
                {
                    image: image,
                    name: name,
                    lastName: lastName,
                    userName: userName,
                    birthdate: birthdate,    
                    address: address,
                    numberPhone: numberPhone,
                },
                {
                    where: { email: email },
                    returning: true // Esta opción permite que retorne los registros actualizados
                }
            );

            if (updatedRowsCount === 0) {
                throw new Error(`Usuario con email ${email} no encontrado`);
            }

            // Devolver el primer registro actualizado (puede haber más si se actualizan varias filas)
            return updatedRows[0];
        } else {
            const match =  await comparePassword(userActualPassword, DBpassword);
            if (match) {
                const newDBpassword =  await hashPassword(userNewPassword);
                const [updatedRowsCount, updatedRows] = await User.update(
                    {
                        image: image, 
                        name: name,
                        lastName: lastName,
                        userName: userName,
                        birthdate: birthdate, 
                        address: address,
                        numberPhone: numberPhone,
                        password: newDBpassword
                    },
                    {
                        where: { email: email },
                        returning: true // Esta opción permite que retorne los registros actualizados
                    }
                );
                if (updatedRowsCount === 0) {
                    throw new Error('No se aplicaron los cambios');
                }
                // Devolver el primer registro actualizado (puede haber más si se actualizan varias filas)
                return updatedRows[0];
            } else {
                throw new Error('Contraseña actual incorrecta');
            }
        }
       
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = modifyUser;
