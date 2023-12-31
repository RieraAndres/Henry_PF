import { useSelector, useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import { getAllUsers, getAllReviws, getAllDonations } from '../../Redux/Actions';

import styles from './Dashboard.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import UserTable from '../../Components/UserTable/UserTable';
import DonationsTable from '../../Components/DonationsTable/DonationsTable';
import ReviewsTable from '../../Components/ReviewsTable/ReviewsTable';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = () => {
    const dbUsers = useSelector(state=>state.allUsers)
    const donations = useSelector(state=>state.allDonations)

    dbUsers.sort((a, b) => a.userName.localeCompare(b.userName));

    const reviews = useSelector(state=> state.allReviews)

    const [users, setUsers] = useState([]); // Estado de los usuarios

    const [showUsers,setShowUsers] = useState(false)
    const [showDonations,setShowDonations] = useState(false)
    const [showReviews,setShowReviews] = useState(false)
    const dispatch = useDispatch();

     //AL RENDERIZAR DASHBOARD CARGO ALLUSERS CON USUARIOS Y ESTADO LOCAL TAMBIEN
     useEffect(() => {
        dispatch(getAllUsers()).then((data)=>{setUsers(data.payload)});
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getAllReviws())
        dispatch(getAllDonations())
    },[dispatch])

    const onUserDelete = (id) => {
        // Eliminar el usuario del estado local
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      };

      const onUpdateUser = (id) => {
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    typeUser: user.typeUser === "Admin" ? "Adopter" : "Admin"
                };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleShowUsers = ()=>{
        if(showUsers === true){
            setShowUsers(false)
        }else{
            setShowUsers(true)
            setShowDonations(false)
            setShowReviews(false)
        }
    }

    const handleShowDonations = ()=>{
        if(showDonations === true){
            setShowDonations(false)
        }else{
            setShowDonations(true)
            setShowUsers(false)
            setShowReviews(false)
        }
    }

    const handleShowReviews = ()=>{
        if(showReviews === true){
            setShowReviews(false)
        }else{
            setShowReviews(true)
            setShowUsers(false)
            setShowDonations(false)
        }
    }
  return (
    <div className={styles.page}>
        <div>
            <NavBar/> 
        </div>
        <div className={styles.container}>
        <p className={styles.titulo}>DASHBOARD DE ADMINISTRADOR</p>
        <Row   md={3} className={styles.botones}>
            <Col>
                <button className={styles.buttonSelect} onClick={handleShowUsers}>USUARIOS</button>
            </Col>
            <Col>
                <button className={styles.buttonSelect} onClick={handleShowDonations}>DONACIONES</button>
            </Col>
            <Col>
                <button className={styles.buttonSelect} onClick={handleShowReviews}>RESEÑAS</button>
            </Col>
        </Row>
        <div>
            {showUsers &&  
            <Row  xs={1} md={1}>
                  <Col>
                    <div className={styles.table}>
                      <p>USUARIOS</p>
                      <UserTable  onUpdateUser={onUpdateUser} onUserDelete={onUserDelete} users={users}/>
                    </div>
                  </Col>   
            </Row>}
           {showDonations && 
           <Row  xs={1} md={1}>
                <Col>
                  <div className={styles.table}>
                    <p>DONACIONES</p>
                    <DonationsTable donations={donations}/>
                  </div>
                </Col>   
            </Row>
           }
            {showReviews && 
             <Row  xs={1} md={1}>
                <Col>
                  <div className={styles.table}>
                    <p>Reviews</p>
                    <ReviewsTable reviews={reviews}/>
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