import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './MenuPage.css';
import axios from 'axios';
import C1 from "./img/carusel1.jpg"
import C2 from "./img/carusel2.jpg"
import C3 from "./img/carusel3.jpg"
import { Carousel } from 'react-bootstrap';
import RWindow from "./RecipeWindow";

function MenuPage({formData}) {
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

  useEffect(() => {
    cargarModelo();
    console.log(formData)
  }, [formData]);

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

  return (
    <>
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
    <h2>Recipe recommendationl - Using Artificial Intelligence</h2>
    
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


