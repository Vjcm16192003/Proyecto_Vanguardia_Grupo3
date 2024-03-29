import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';  // Asegúrate de proporcionar la ruta correcta
import './Store.css';  // Importa un archivo CSS para los estilos
import { useNavigate } from 'react-router-dom';
import rice from '../Images/rice.jpeg';
import quinoa from '../Images/quinoa.jpeg';
import kale from '../Images/kale.jpeg';
import avocado from '../Images/avocado.jpeg';
import chia from '../Images/chia.jpeg';
import spinach from '../Images/spinach.jpeg';
import blueberries from '../Images/blueberries.jpeg';
import watermelon from '../Images/watermelon.jpg';




function Store() {

    const [cartItems, setCartItems] = useState([]);
    const [quotingEnabled, setQuotingEnabled] = useState(false);
    const [headerPaddingTop, setHeaderPaddingTop] = useState(quotingEnabled ? '0vw' : '55vw');
    const { logout } = useContext(AuthContext);


    const handleSignOutClick = () => {
        localStorage.clear();
        navigate('/');
        logout();
    };

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            const updatedItems = cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem && existingItem.quantity > 1) {
            const updatedItems = cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCartItems(updatedItems);
        } else if (existingItem) {
            // Eliminar el elemento si su cantidad es 1
            const updatedItems = cartItems.filter((item) => item.id !== product.id);
            setCartItems(updatedItems);
        }
    };


    const toggleQuoting = () => {
        setQuotingEnabled(!quotingEnabled);
        setHeaderPaddingTop(quotingEnabled ? '120vw' : '100vw');
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const products = [
        { id: 1, name: 'Organic Brown Rice', description: 'Premium organic brown rice', price: 7.99, category: 'Grains', image: rice },
        { id: 2, name: 'Organic Quinoa', description: 'Certified organic quinoa grains', price: 9.99, category: 'Grains', image: quinoa },
        { id: 3, name: 'Organic Kale', description: 'Fresh and nutritious organic kale', price: 3.49, category: 'Vegetables', image: kale },
        { id: 4, name: 'Organic Avocado', description: 'Ripe and creamy organic avocados', price: 2.99, category: 'Fruits', image: avocado },
        { id: 5, name: 'Organic Chia Seeds', description: 'High-quality organic chia seeds', price: 6.49, category: 'Seeds', image: chia },
        { id: 6, name: 'Organic Spinach', description: 'Organic baby spinach leaves', price: 4.99, category: 'Vegetables', image: spinach },
        { id: 7, name: 'Organic Blueberries', description: 'Sweet and juicy organic blueberries', price: 5.99, category: 'Fruits', image: blueberries },
        { id: 8, name: 'Organic Watermelon', description: 'Delicious organic watermelon', price: 10.99, category: 'Fruits', image: watermelon },
    ];




    const navigate = useNavigate();

    const handleLanding = () => {
        navigate('/landing');
    };

    const handleRecipe = () => {
        navigate('/recipe');
    };


    const handleStore = () => {
        navigate('/store');
    };

    const handlePerfil = () => {
        navigate('/perfil');
    };


    return (
        <div id="scrollable-page">
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



            {/*Aqui va todo el Contenido*/}

            <div id="header" style={{ paddingTop: headerPaddingTop }}>ORGANIC PRODUCTS CATALOG</div>
            <div id="empty-space-top"></div>

            <div id="catalog-container" >
                {products.map((product) => (
                    <div key={product.id} className="product-wrapper">
                        <div className="product-item">
                            <div className="product-item-content">


                                <img src={product.image} alt={product.name} style={{ width: '200px', height: '150px', objectFit: 'cover', paddingLeft: '10%' }} />
                                <div>
                                    <h2 id="tittle">{product.name}</h2>
                                    <p id="name">{product.description}</p>
                                    <p id="price">{`Precio: $${product.price.toFixed(2)}`}</p>
                                    <div className="quantity">
                                        <button onClick={() => decreaseQuantity(product)}>-</button>
                                        <span>{cartItems.find((item) => item.id === product.id)?.quantity || 0}</span>
                                        <button onClick={() => addToCart(product)}>+</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Carrito de Compras */}
            <div id="transaction-container">
                <button id="transaction-button" onClick={toggleQuoting}>
                    {quotingEnabled ? 'Cancel Quote' : 'Quote Products'}
                </button>
            </div>
            {quotingEnabled && (
                <div id="quoting-container">
                    <h3>Quote</h3>
                    {cartItems.map((item, index) => (
                        <div key={item.id} id="quoting-item">
                            <span id="quoting-item-name">{item.name}</span>
                            <span id="quoting-item-total">{`Total: $${(item.price * item.quantity).toFixed(2)}`}</span>
                            {index !== cartItems.length - 1 && <hr id="quoting-item-separator" />}
                        </div>
                    ))}
                    <div id="total-amount">{`Total: $${totalAmount.toFixed(2)}`}</div>
                </div>
            )}







            <footer id="foo">
                <div class="footer-rights">
                    <p>© 2024 Vitalia. All Rights Reserved. </p>

                </div>

            </footer>

        </div>
    );
}

export default Store;