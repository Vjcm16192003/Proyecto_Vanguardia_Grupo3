import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './MenuPage.css';
import axios from 'axios';

function MenuPage({formData}) {
  const [model, setModel] = useState(null);
  const [calories,setCalories] =useState(0)
  const [recipes, setRecipes] = useState([]);
  const [IngredientsBreakfast, setIngredientsBreakfast] = useState([]);
  const [IngredientsLunch, setIngredientsLunch] = useState([]);
  const [IngredientsDinner, setIngredientsDinner] = useState([]);
  const [ingredientsSnack, setIngredientsSnack] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [recetas,setRecetas]=useState([])
  const breakfast = ["Eggs", "Bread", "Milk", "Cereal", "Fruits", "Yogurt", "Butter", "Cheese", "Bacon", "Ham", "Sausages", "Vegetables", "Potatoes", "Coffee", "Tea",  "Honey", "Nuts"];
  const lunch = ["Chicken", "Beef", "Pork", "Fish", "Rice", "Pasta", "Salad", "Vegetables", "Bread", "Cheese", "Soup"];
  const dinner = ["Chicken", "Beef", "Pork", "Fish", "Rice", "Pasta", "Potatoes", "Salad", "Vegetables", "Beans", "Bread", "Cheese", "Soup", "Tomatoes", "Onions", "Garlic", "Herbs"];
  const healthySnacks = ["Nuts", "Fruits", "Vegetables", "Yogurt", "Cheese", "Hummus", "Popcorn", "Edamame"];


  const [predict, setPredict] = useState({
    age : 0, 
    weight: 0 , 
    height: 0, 
    sex: 0, 
    physicalActivity:0,
    diet_type: 'Normal',
    allergies: [""],
  });

  useEffect(() => {
    const cargarData = async ()=> {
      const x = formData.sex === 'male' ? 0 : 1;
      const dateOfBirth = new Date(formData.date_of_birth);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - dateOfBirth);
      const aged = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
      setPredict({
        ...predict,
        age:aged,
        weight: formData.weight,
        height: formData.height,
        sex: x,
        physicalActivity:formData.physicalActivity,
        diet_type:formData.diet_type,
        allergies:formData.allergies
      })
      await cargarModelo();
    }
    cargarData();
  }, []);


  const cargarModelo = async () => {
    const modelo = await tf.loadLayersModel('localstorage://mymodel');
    setModel(modelo)
  
    //hacer prediccion predeterminada
    const inputData = tf.tensor([[predict.age, predict.weight, predict.height, predict.sex, predict.physicalActivity]]);
    const prediction = model.predict(inputData);
    setCalories(prediction.dataSync()[0].toFixed(2))
  };

  const fetchData = async (time, min ,comida) => {
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
      setRecipes(response.data.hits); 

      const newRecipeData = recipes.map(recipe => {
        const caloriesPerServing = recipe.recipe.calories / recipe.recipe.yield;
        console.log(recipe.recipe.image)
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
      setRecetas(...recetas,newRecipeData)
      
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

  const GenerarMenu = () => {
    setIsVisible(!isVisible)
    const diez = ((calories * 10) / 100).toFixed(2);
    const treinta = ((calories * 30) / 100).toFixed(0);
    console.log(treinta)
    fetchData('breakfast',treinta,IngredientsBreakfast)
    /*fetchData('lunch',treinta,IngredientsLunch)
    fetchData('dinner',treinta,IngredientsDinner)
    fetchData('snack',diez,ingredientsSnack)*/


    console.log(recetas)

  }

  return (
    <div className="scrollable-page">

      <div id="container">
      {isVisible && (
        <>
        <h3>Ingredients for Breakfast</h3>
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

          <h3>Ingredients for Lunch</h3>
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

          <h3>Ingredients for Dinner</h3>
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

          <h3>Ingredients for Snack</h3>
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

        </>
      )}
          <center><button onClick={GenerarMenu}>Generate menu </button></center>

      {!isVisible && (
        <div className="container">
        <div className="row">
          {recetas.map((card, index) => (
            <div key={index} >
                <div className="card-img-overlay text-white d-flex flex-column justify-content-center px-5">
                  <h4 className="card-title">{card.name}</h4>
                  <p className="card-text">{card.mealType}</p>
                  <p>{card.date}</p>
                </div>
              
            </div>
          ))}
        </div>
        </div>
      )}

      </div>
    </div>
   
  );
}

export default MenuPage;


