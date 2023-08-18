import React from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch,useSelector } from 'react-redux';
import { clearAlerts, deleteUser } from '../../Redux/Actions';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function UserTable({ users, onUserDelete }) {
  const alerts = useSelector(state=>state.alerts)
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

  function handleDeleteUser(id) {
    dispatch(deleteUser(id));
    onUserDelete(id);
    setShowAlert(true); // Mostrar la alerta al eliminar un usuario
    setTimeout(() => {
      setShowAlert(false);
      dispatch(clearAlerts()); // Ocultar la alerta después de 3 segundos
      window.location.reload(); // Recargar la página
    }, 3000); // 3000 milisegundos = 3 segundos
  }
  

    
  return (
    <div>
      {showAlert && 
      <Alert key='success' variant='success' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>{alerts}</Alert>
      }
      <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nac.</th>
                        <th>Direccion</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Tipo usuario</th>
                        <th>Creado en</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.lastName}</td>
                          <td>{user.birthdate}</td>
                          <td>{user.address}</td>
                          <td>{user.email}</td>
                          <td>{user.numberPhone}</td>
                          <td>{user.typeUser}</td>
                          <td>{user.createdAt}</td>
                          <td>
                            <button style={{marginTop:"5px"}} onClick={() => handleDeleteUser(user.id)}>Borrar usuario</button>
                            <button style={{marginTop:"5px"}}>Ver publicaciones</button>
                            <button style={{marginTop:"5px"}}>Cambiar Tipo</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
    </div>
  );
}

export default UserTable;
