import React, { useEffect, useState, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import Axios from 'axios';
import './MenuPage.css';
import axios from 'axios';
import C1 from "./img/carusel1.jpg"
import C2 from "./img/carusel2.jpg"
import C3 from "./img/carusel3.jpg"
import { Carousel } from 'react-bootstrap';
import RWindow from "./RecipeWindow";
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function MenuPage({formData}) {
  const [userData, setUserData] = useState(null);
  const { userId, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [calorias, setCalorias] = useState(null);
  const [recipesB, setRecipesB] = useState([]);
  const [recipesL, setRecipesL] = useState([]);
  const [recipesD, setRecipesD] = useState([]);
  const [recipesS, setRecipesS] = useState([]);
  const [modalOpen, setModalOpen] = useState({}); 

  const [currentPageB, setCurrentPageB] = useState(0);
  const [currentPageL, setCurrentPageL] = useState(0);
  const [currentPageD, setCurrentPageD] = useState(0);
  const [currentPageS, setCurrentPageS] = useState(0);
  const startIndexB = currentPageB * 3;
  const endIndexB = startIndexB + 3;
  const startIndexL = currentPageL * 3;
  const endIndexL = startIndexL + 3;
  const startIndexD = currentPageD * 3;
  const endIndexD = startIndexD + 3;
  const startIndexS = currentPageS * 3;
  const endIndexS = startIndexS + 3;

  const [IngredientsBreakfast, setIngredientsBreakfast] = useState([]);
  const [IngredientsLunch, setIngredientsLunch] = useState([]);
  const [IngredientsDinner, setIngredientsDinner] = useState([]);
  const [ingredientsSnack, setIngredientsSnack] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const breakfast = [
    "Eggs", "Bread", "Milk", "Fruits", "Yogurt", "Butter", "Cheese", "Bacon", "Ham", "Sausages", "Vegetables", "Potatoes", "Coffee", "Tea",  "Honey", "Nuts"
  ];
  const lunch = [
    "Chicken", "Beef", "Pork", "Fish", "Rice", "Pasta", "Salad", "Vegetables", "Bread", "Cheese", "Soup"
  ];
  const dinner = [
    "Chicken", "Beef", "Pork", "Fish", "Rice", "Pasta", "Potatoes", "Salad", "Vegetables", "Beans", "Bread", "Cheese", "Soup", "Tomatoes", "Onions", "Garlic"
  ];
  const healthySnacks = [
    "Nuts", "Fruits", "Vegetables", "Yogurt", "Cheese", "Hummus", "Popcorn", "Edamame"
  ];

  /*useEffect(() => {
    cargarModelo();
    console.log(formData)
  }, [formData]);*/


  useEffect(() => {
    if (!userId) {
      // Manejar el caso en que userId no esté disponible (podría redirigir al inicio de sesión)
      console.error('ID de usuario no disponible');
      // Puedes redirigir al usuario a la página de inicio de sesión o hacer otras acciones
      return;
    }

    Axios.get(`http://localhost:5000/usuario/${userId}`)
      .then(response => {
        setUserData(response.data);
        cargarModelo();
        console.log(userData)
      })
      .catch(error => {
        console.error('Error al obtener detalles del usuario:', error);
      });
  }, [userId]);




  const cargarModelo = async () => {
    const modelo = await tf.loadLayersModel('localstorage://mymodel');
    setModel(modelo)
    if (modelo!=null){
      console.log("modelo cargado")
    }
  };

  const GenerarMenu = () => {
    if (IngredientsBreakfast.length === 0 ||IngredientsLunch.length === 0 ||IngredientsDinner.length === 0 ||ingredientsSnack.length === 0) {
      alert('Error: Debes agregar al menos un ingrediente para cada una de las comidas.');
      return false;
  }
    const x = formData.sex === 'male' ? 0 : 1;
    const dateOfBirth = new Date(formData.date_of_birth);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - dateOfBirth);
    const aged = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    
    //hacer prediccion predeterminada
    const inputData = tf.tensor([[aged, formData.weight, formData.height, x, formData.physicalActivity]]);
    const prediction =  model.predict(inputData);
    const caloriasTotales =prediction.dataSync()[0].toFixed(2);

    console.log("la cantidad de calorias es: ",caloriasTotales)

    setIsVisible(!isVisible)
    
    //Trae los platillos
    setCalorias(caloriasTotales)
    const diez = ((caloriasTotales * 10) / 100).toFixed(0);
    const treinta = ((caloriasTotales * 30) / 100).toFixed(0);
    console.log(treinta)
    fetchData('breakfast',treinta,IngredientsBreakfast,setRecipesB)

    fetchData('lunch',treinta,IngredientsLunch,setRecipesL)
    fetchData('dinner',treinta,IngredientsDinner,setRecipesD)
    fetchData('snack',diez,ingredientsSnack,setRecipesS)
  }

  const fetchData = async (time, min ,comida,setRecipes) => {
    try {
      const response = await axios.get('https://api.edamam.com/search', {
        params: {
          q: comida.join(','), 
          app_id: 'f98b76dc',
          app_key: '4018c1b5e3ecc4452017695bb9e2e049',
          calories: `${min - 100}-${min}`,
          mealType: time        
        }
      });

      const newRecipeData = await (response.data.hits).map(recipe => {
        const caloriesPerServing = recipe.recipe.calories / recipe.recipe.yield;
        return {
          name: recipe.recipe.label,
          steps: recipe.recipe.url, 
          caloriesPerServing: caloriesPerServing,
          imageUrl: recipe.recipe.image,
          ingredients: recipe.recipe.ingredientLines,
          mealType:time, 
          healthLabels : recipe.recipe.healthLabels
        };
      });

      setRecipes(newRecipeData);
      return newRecipeData;

    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  };

  const handleIngredientChange = (e, setIngredients) => {
    const { value, checked } = e.target;
    if (checked) {
      setIngredients(prevIngredients => [...prevIngredients, value]);
    } else {
      setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient !== value));
    }
  };

  const toggleModal = (recipeName) => {
    setModalOpen(prevState => ({
      ...prevState,
      [recipeName]: !prevState[recipeName] // Invierte el estado del modal específico
    }));
  };

  const nextPageB = () => {
    setCurrentPageB(prevPage => prevPage + 1);
  };

  const prevPageB = () => {
    setCurrentPageB(prevPage => prevPage - 1);
  };

  const nextPageL = () => {
    setCurrentPageL(prevPage => prevPage + 1);
  };

  const prevPageL = () => {
    setCurrentPageL(prevPage => prevPage - 1);
  };

  const nextPageD = () => {
    setCurrentPageD(prevPage => prevPage + 1);
  };

  const prevPageD = () => {
    setCurrentPageD(prevPage => prevPage - 1);
  };

  const nextPageS = () => {
    setCurrentPageS(prevPage => prevPage + 1);
  };

  const prevPageS = () => {
    setCurrentPageS(prevPage => prevPage - 1);
  };

  const handleSignOutClick = () => {
    localStorage.clear();
    navigate('/');
    logout();
};

  const handleStore = () => {
    navigate('/store');
};

const handleRecipe = () => {
  navigate('/recipe');
};


const handleLanding = () => {
  navigate('/landing');
};

const handlePerfil = () => {
  navigate('/perfil');
};

const handleAI = () => {
  navigate('/AI');
};


  return (
    <>

<nav id="nav">
        <a id="logo">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="80" height="60"
            viewBox="0 0 242 200"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
              fill="#000000" stroke="none">
              <path d="M950 1559 c-204 -76 -249 -92 -468 -171 l-92 -33 2 -393 3 -393 70 -28 c39 -15 106 -41 150 -59 44 -17 154 -60 245 -95 250 -99 294 -114 312 -112 20 4 723 262 749 276 18 9 19 28 19 394 0 368 -1 385 -19 394 -11 6 -57 26 -103 45 -45 18 -144 59 -218 89 -74 31 -196 81 -270 111 -74 31 -142 56 -150 56 -8 -1 -112 -37 -230 -81z m445 -25 c247 -102 379 -156 455 -188 l55 -23 5 -199 c3 -109 3 -280 0 -379 l-5 -179 -370 -137 -370 -136 -65 25 c-131 50 -240 93 -460 179 l-225 88 -3 372 c-2 350 -1 373 16 382 10 5 137 53 282 107 146 54 310 114 365 135 55 21 102 38 105 38 2 1 99 -38 215 -85z" />
              <path d="M921 1333 c64 -86 96 -140 90 -146 -15 -15 -25 -4 -123 126 -107 144 -97 131 -103 126 -2 -3 38 -64 90 -136 52 -73 95 -137 95 -142 0 -30 -34 2 -124 115 -54 68 -101 122 -104 120 -2 -3 37 -59 87 -125 100 -132 111 -151 88 -151 -8 0 -61 57 -116 126 -56 70 -101 123 -101 119 0 -7 139 -217 197 -297 30 -42 39 -48 71 -48 47 0 53 -4 92 -68 32 -52 32 -53 14 -75 -11 -12 -67 -74 -125 -137 -140 -155 -176 -233 -129 -280 11 -11 32 -20 48 -20 61 0 124 66 232 246 28 46 55 86 59 89 5 2 32 -35 62 -83 108 -178 165 -241 225 -249 76 -10 101 64 51 150 -14 24 -78 100 -141 170 -64 69 -116 131 -116 137 0 6 16 35 35 65 33 53 36 55 79 55 l44 0 109 163 c120 178 126 187 120 187 -3 0 -51 -58 -107 -130 -93 -117 -120 -142 -120 -107 0 7 43 68 95 136 52 69 92 127 90 130 -3 2 -6 2 -8 0 -41 -57 -201 -249 -208 -249 -22 0 -5 36 59 123 100 136 115 158 109 163 -2 3 -48 -54 -102 -126 -53 -71 -101 -130 -105 -130 -27 0 -12 33 67 142 98 136 106 148 100 148 -3 0 -64 -71 -137 -157 l-132 -157 6 -51 c6 -50 5 -52 -35 -91 l-41 -39 -39 45 c-21 25 -37 50 -35 57 3 6 7 27 11 45 6 34 -4 47 -226 306 -69 81 -47 41 52 -95z" />
              <path d="M480 1020 c0 -19 7 -20 160 -20 153 0 160 1 160 20 0 19 -7 20 -160 20 -153 0 -160 -1 -160 -20z" />
              <path d="M1530 1020 c0 -19 7 -20 155 -20 148 0 155 1 155 20 0 19 -7 20 -155 20 -148 0 -155 -1 -155 -20z" />
              <path d="M440 960 c0 -19 6 -20 201 -20 186 0 200 1 197 18 -3 15 -22 17 -201 20 -192 2 -197 2 -197 -18z" />
              <path d="M1487 974 c-4 -4 -7 -13 -7 -21 0 -10 41 -13 206 -13 190 0 205 1 202 18 -3 15 -22 17 -199 20 -107 1 -198 -1 -202 -4z" />
              <path d="M482 893 c3 -16 19 -18 158 -18 139 0 155 2 158 18 3 16 -10 17 -158 17 -148 0 -161 -1 -158 -17z" />
              <path d="M1530 890 c0 -19 7 -20 155 -20 148 0 155 1 155 20 0 19 -7 20 -155 20 -148 0 -155 -1 -155 -20z" />
            </g>
          </svg></a>
        <div>
          <ul id="navbar">
            <li><a onClick={handleLanding}>HOME</a></li>
            <li><a onClick={handleStore}>STORE</a></li>
            <li><a onClick={handleRecipe}>RECIPES</a></li>
            <li><a onClick={handleAI}>TEST AI</a></li>
            <li class="dropdown">
                <a href="#">PROFILE</a>
                <div class="dropdown-content">
                    <a onClick={handlePerfil}>EDIT PROFILE</a>
                    <a onClick={handleSignOutClick}>LOGOUT</a>
                </div>
            </li>
          </ul>
        </div>
      </nav>

    <div className="carousel-container">
      <Carousel >
        <Carousel.Item>
          <img className="d-block w-100" src={C1} alt="First slide"/>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={C2}alt="Second slide"/>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={C3} alt="Third slide"/>
        </Carousel.Item>
      </Carousel>
    </div>
    <br/>
    <h2>Recipe recommendation - Using Artificial Intelligence</h2>


    
    <div id="container">
      {isVisible && (
        <>
        <h3>Breakfast</h3>
          <div className="ingredient-list">
            {breakfast.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <label htmlFor={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    id={ingredient}
                    value={ingredient}
                    checked={IngredientsBreakfast.includes(ingredient)}
                    onChange={(e) => handleIngredientChange(e, setIngredientsBreakfast)}
                  />
                  {ingredient}
                </label>
              </div>
            ))}
          </div>
        <h3>Lunch</h3>
        <div className="ingredient-list">
            {lunch.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <label htmlFor={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    id={ingredient}
                    value={ingredient}
                    checked={IngredientsLunch.includes(ingredient)}
                    onChange={(e) => handleIngredientChange(e, setIngredientsLunch)}
                  />
                  {ingredient}
                </label>
              </div>
            ))}
        </div>
        <h3>Dinner</h3>
        <div className="ingredient-list">
            {dinner.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <label htmlFor={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    id={ingredient}
                    value={ingredient}
                    checked={IngredientsDinner.includes(ingredient)}
                    onChange={(e) => handleIngredientChange(e, setIngredientsDinner)}
                  />
                  {ingredient}
                </label>
              </div>
            ))}
        </div>
        <h3>Snack</h3>
        <div className="ingredient-list">
            {healthySnacks.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <label htmlFor={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    id={ingredient}
                    value={ingredient}
                    checked={ingredientsSnack.includes(ingredient)}
                    onChange={(e) => handleIngredientChange(e, setIngredientsSnack)}
                  />
                  {ingredient}
                </label>

              </div>
            ))}
        </div>
        <center><button onClick={GenerarMenu}>Generate menu </button></center>
        </>
      )}
      
      {!isVisible && (
        <>
        <div className="row">
          <div className='d-flex justify-content-between'>
            <div>
              <h3>Breakfast 30%</h3>
              <p >{((calorias * 30) / 100).toFixed(0)} Calorias</p>
            </div>
            <div>
              <button onClick={prevPageB} disabled={currentPageB === 0}>&lt;</button>
              <button onClick={nextPageB} disabled={endIndexB  >= recipesB.length}>&gt;</button>
            </div>
          </div>
          {recipesB.slice(startIndexB, endIndexB).map((card, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card">
                  <img src={card.imageUrl} className="card-img-top" alt={card.name} />
                  <div className="card-body">
                    <h5 className="card-title">{card.name}</h5>
                    <p className="card-text">{card.caloriesPerServing.toFixed(0)}</p>
                    
                    <RWindow 
                    isOpen={modalOpen[card.name]} 
                    toggleModal={() => toggleModal(card.name)} 
                    steps={card.steps}
                    ingredients={card.ingredients}
                    healthLabels={card.healthLabels}
                    />
                    <button  onClick={() => toggleModal(card.name)}> + information</button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <div className="row">
        <div className='d-flex justify-content-between'>
            <div>
              <h3>Lunch 30%</h3>
              <p>{((calorias * 30) / 100).toFixed(0)} Calorias</p>
            </div>
            <div>
              <button onClick={prevPageL} disabled={currentPageL === 0}>&lt;</button>
              <button onClick={nextPageL} disabled={endIndexL >= recipesB.length}>&gt;</button>
            </div>
          </div>
          {recipesL.slice(startIndexL, endIndexL).map((card, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <div className="card">
                <img src={card.imageUrl} className="card-img-top" alt={card.name} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.caloriesPerServing.toFixed(0)}</p>
                  <RWindow 
                    isOpen={modalOpen[card.name]} 
                    toggleModal={() => toggleModal(card.name)} 
                    steps={card.steps}
                    ingredients={card.ingredients}
                    healthLabels={card.healthLabels}
                    />
                    <button  onClick={() => toggleModal(card.name)}> + information</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
        <div className='d-flex justify-content-between'>
            <div>
              <h3>Dinner 30%</h3>
              <p>{((calorias * 30) / 100).toFixed(0)} Calorias</p>
            </div>
            <div>
              <button onClick={prevPageD} disabled={currentPageD === 0}>&lt;</button>
              <button onClick={nextPageD} disabled={endIndexD >= recipesB.length}>&gt;</button>
            </div>
          </div>
          {recipesD.slice(startIndexD, endIndexD).map((card, index) => (
            <div key={index}className="col-lg-4 mb-4">
              <div className="card">
                <img src={card.imageUrl} className="card-img-top" alt={card.name} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.caloriesPerServing.toFixed(0)}</p>
                  <RWindow 
                    isOpen={modalOpen[card.name]} 
                    toggleModal={() => toggleModal(card.name)} 
                    steps={card.steps}
                    ingredients={card.ingredients}
                    healthLabels={card.healthLabels}
                    />
                    <button  onClick={() => toggleModal(card.name)}> + information</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">

        <div className='d-flex justify-content-between'>
            <div>
              <h3>Snack 10%</h3>
              <p>{((calorias * 10) / 100).toFixed(0)} Calorias</p>
            </div>
            <div>
              <button onClick={prevPageS} disabled={currentPageS === 0}>&lt;</button>
              <button onClick={nextPageS} disabled={endIndexS >= recipesB.length}>&gt;</button>
            </div>
          </div>
          {recipesS.slice(startIndexS, endIndexS).map((card, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <div className="card">
                <img src={card.imageUrl} className="card-img-top" alt={card.name} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.caloriesPerServing.toFixed(0)}</p>
                  <RWindow 
                    isOpen={modalOpen[card.name]} 
                    toggleModal={() => toggleModal(card.name)} 
                    steps={card.steps}
                    ingredients={card.ingredients}
                    healthLabels={card.healthLabels}
                    />
                    <button  onClick={() => toggleModal(card.name)}> + information</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )} 
    </div>
    </>
  );
}

export default MenuPage;


