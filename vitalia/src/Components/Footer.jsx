import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Importar el archivo CSS

const Footer = ({ isLoggedIn, userType, nombre, handleSignOutClick }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <footer class="text-center text-lg-start custom-colors custom-footer">
            <section class="d-flex justify-content-between py-2 px-0 border-bottom footer-info">
                <div class="row justify-content-md-center footer-info mb-2">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        numero
                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        hola
                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto text-center">
                        rocco
                    </div>
                </div>
            </section>
            <div className="py-2 px-4 smalltext-copyright">

            </div>
        </footer>
    );
};

export default Footer;
