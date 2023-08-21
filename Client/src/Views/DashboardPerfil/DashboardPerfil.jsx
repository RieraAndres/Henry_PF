import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearAux, getAllUserData } from "../../Redux/Actions";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import styles from './DashboardPerfil.module.css'
import CardsComponent from "../../Components/Cards/cards";

const DashboardPerfil = () => {
    const [userDataLocal,setUserDataLocal] = useState({}) 
    const {id} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getAllUserData(id)).then((data)=>{setUserDataLocal(data.payload)})
      return ()=>{
        dispatch(clearAux())
        setUserDataLocal([])
      }
    }, [dispatch,id]);
    if(!userDataLocal){
      return (<></>)
    }else{
      return (
        <div className={styles.page}>
          <div>
            <NavBar/>
          </div>
          <div className={styles.container}>
            <p>PUBLICACIONES DE {userDataLocal.userName}</p>
            <CardsComponent mascotas={userDataLocal.mascotas}/>
          </div>
          <Footer/>
        </div>
        
      );
    }
 
};

export default DashboardPerfil;