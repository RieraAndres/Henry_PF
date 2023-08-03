import { Link } from "react-router-dom";
import "../FormAdopt/FormAdopt.css";

const FormAdopt = () => {
  const petImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9fXdpJB0hPO4koiUiXLJHsRKnAhyH7jrBQ&usqp=CAU";
  const petName = "Nombre de la mascota";

  return (
    <div className="createGame">
      <div className="titleCG">
        <Link to={"/home"}>
          <button id="btnHomeCG" className="goHome">
            {" "}
            Atrás{" "}
          </button>
        </Link>
        <h1 className="tituloCG"> Formulario Adopción </h1>
      </div>
      <div id="CreateGame">
        {/* Form Create */}
        <div className="createGameContainer">
          <form className="form" action="">
            {/* Name */}
            <div className="sectionInputCG">
              <label className="label" htmlFor="name"></label>
              <input
                type="text"
                className="input"
                name="name"
                required
                autoComplete="off"
                placeholder="Nombre completo"
              />
            </div>

            {/* Telefono */}
            <div className="sectionInputCG">
              <label className="label" htmlFor="telefono"></label>
              <input
                type="text"
                className="input"
                name="telefono"
                autoComplete="off"
                placeholder="Teléfono"
              />
            </div>

            {/* Email */}
            <div className="sectionInputCG">
              <label className="label" htmlFor="email"></label>
              <input
                type="text"
                className="input"
                name="email"
                required
                autoComplete="off"
                placeholder="Email"
              />
            </div>

            {/* ReleaseDate */}
            <div className="sectionInputCG">
              <label className="label" htmlFor="releaseDate"></label>
              <input
                type="date"
                name="releaseDate"
                id="dateCG"
                className="input"
                required
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div className="sectionInputCG">
              <label className="label" htmlFor="description"></label>
              <textarea
                name="description"
                id="descriptionCG"
                minLength="10"
                maxLength="300"
                className="input"
                required
                autoComplete="off"
                placeholder="¿Por qué quieres adoptar?"
              ></textarea>
            </div>
          </form>
        </div>
        {/* Div para la carta de la mascota */}
        <div className="petCard">
          <div className="petInfo">
            <h2>{petName}</h2>
            <div
              className="petImage"
              style={{ backgroundImage: `url(${petImage})` }}
            >
              {/* Puedes ajustar estilos aquí para el div de la imagen */}
            </div>
            <div className="petOptions">
              <div className="petOption">Adulto</div>
              <div className="petOption">Macho</div>
            </div>
          </div>
        </div>

        {/* Preview 
                <div className='CardPreview'>
                    <div id='card'>
                        <div className='imgCard'>
                            <img className='img' src={ newGame.image } alt='Game' />
                        </div>
                        <div className='cardInfo'>
                            <section className='cardClose'>
                                <button className='rating' value={ Math.round(newGame.rating) } > { newGame.rating } </button>
                                <section className='platform'>
                                    { platforms( newGame.parent_platforms ) }
                                </section>
                                <h1 className='name'> { newGame.name } </h1>
                            </section>
                            <section className='cardOpen'>
                                <p className='cardGenres'> 
                                    { genreSelect.join(", ") } 
                                </p>
                            </section>
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default FormAdopt;
