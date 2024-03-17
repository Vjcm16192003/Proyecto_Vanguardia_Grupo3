import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import './MenuPage.css';

function MenuPage({formData}) {
  const [model, setModel] = useState(null);
  const [calories,setCalories] =useState(0)

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
    cargarValores();
  }, []);

  const cargarValores =()=>{
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
    console.log(predict)
    cargarModelo();
  }

  const cargarModelo = async () => {
    const modelo = await tf.loadLayersModel('localstorage://mymodel');
    console.log("modelo cargado")
    setModel(modelo)
  
    //hacer prediccion predeterminada
    const inputData = tf.tensor([[predict.age, predict.weight, predict.height, predict.sex, predict.physicalActivity]]);
    const prediction = model.predict(inputData);
    setCalories(prediction.dataSync()[0].toFixed(2))
    console.log(calories)
  };

  

  return (
    <div id="container">
      <div id="button-container">
        <h1>dasdas</h1>
      </div>
    </div>
  );
}

export default MenuPage;


