import React from 'react';
import './RecipeWindows.css';

function Window({isOpen,setIsOpen,steps,ingredients,healthLabels}) {

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div>
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={toggleModal}>&times;</span>
            <h4>Ingredients</h4>
            {ingredients.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
            <br/>
            <h4>Recipe</h4>
            <a href={steps}>{steps}</a>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Window;


