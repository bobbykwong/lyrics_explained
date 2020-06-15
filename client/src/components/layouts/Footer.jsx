import React from 'react'
import '../../App.css';

function Footer() {
    return(
        <footer className="footer-container">
            <div className="container">
                <div className="row footer-div">
                    <div className="col-md-3">
                        <h4>Links</h4>
                        <p>FAQ</p>
                        <p>Help</p>
                        <p>Support</p>
                    </div>
                    <div className="col-md-3">
                        <h4>Social</h4>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Linkedin</p>
                    </div>
                    <div className="col-md-3">
                        <h4>Blog</h4>
                        <p>About Us</p>
                        <p>Contact</p>
                    </div>
                    <div className="col-md-3">
                        <h4>Legal</h4>
                        <p>Terms</p>
                        <p>Privacy</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer