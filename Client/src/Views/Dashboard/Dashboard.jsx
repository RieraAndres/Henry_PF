import styles from './Dashboard.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import UserTable from '../../Components/UserTable/UserTable';
import { getAllUsers,clearAux } from '../../Redux/Actions';

const Dashboard = () => {
    const dbUsers = useSelector(state=>state.allUsers)
    dbUsers.sort((a, b) => a.userName.localeCompare(b.userName));

    const [users, setUsers] = useState([]); // Estado de los usuarios
    const dispatch = useDispatch();

     //AL RENDERIZAR DASHBOARD CARGO ALLUSERS CON USUARIOS Y ESTADO LOCAL TAMBIEN
     useEffect(() => {
        dispatch(getAllUsers()).then((data)=>{setUsers(data.payload)});
        return () => {
            dispatch(clearAux());
        };
    }, [dispatch]);

    const handleUserDelete = (id) => {
        // Eliminar el usuario del estado local
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      };
    
  return (
    <div className={styles.page}>
        <div>
            <NavBar/> 
        </div>
        <div className={styles.container}>
            <div className={styles.table}>
                <p>USUARIOS</p>
                <UserTable onUserDelete={handleUserDelete} users={users}/>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
    
  );
};

export default Dashboard;