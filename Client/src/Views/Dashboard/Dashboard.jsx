import styles from './Dashboard.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import UserTable from '../../Components/UserTable/UserTable';
import DonationsTable from '../../Components/DonationsTable/DonationsTable';
import { getAllUsers,clearAux } from '../../Redux/Actions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = () => {
    const dbUsers = useSelector(state=>state.allUsers)
    dbUsers.sort((a, b) => a.userName.localeCompare(b.userName));

    const [users, setUsers] = useState([]); // Estado de los usuarios
    const [showUsers,setShowUsers] = useState(false)
    const [showDonations,setShowDonations] = useState(false)
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
    const handleShowUsers = ()=>{
        if(showUsers === true){
            setShowUsers(false)
        }else{
            setShowUsers(true)
        }
    }

    const handleShowDonations = ()=>{
        if(showDonations === true){
            setShowDonations(false)
        }else{
            setShowDonations(true)
        }
    }
  return (
    <div className={styles.page}>
        <div>
            <NavBar/> 
        </div>
        <div className={styles.container}>
        <p style={{fontSize:"80px"}}>DASHBOARD DE ADMINISTRADOR</p>
        <Row xs={1} md={2}>
            <Col>
                <button onClick={handleShowUsers}>USUARIOS</button>
            </Col>
            <Col>
                <button onClick={handleShowDonations}>DONACIONES</button>
            </Col>
        </Row>
        <div>
            {showUsers &&  
            <Row  xs={1} md={1}>
                  <Col>
                    <div className={styles.table}>
                      <p>USUARIOS</p>
                      <UserTable onUserDelete={handleUserDelete} users={users}/>
                    </div>
                  </Col>   
            </Row>}
           {showDonations && 
           <Row  xs={1} md={1}>
                <Col>
                  <div className={styles.table}>
                    <p>DONACIONES</p>
                    <DonationsTable/>
                  </div>
                </Col>   
            </Row>
           }
            
        </div>
       
            
            
        </div>
        <div>
            <Footer/>
        </div>
    </div>
    
  );
};

export default Dashboard;