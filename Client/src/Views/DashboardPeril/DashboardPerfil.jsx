import { useParams } from "react-router-dom";

const DashboardPerfil = () => {
    const {id} = useParams()
    
  return (
    <div>
        <p>Estas en DashoboardPerfil</p>
    </div>
    
  );
};

export default DashboardPerfil;