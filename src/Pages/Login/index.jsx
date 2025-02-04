import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import Map from "../../Component/Map";
import GotoTop from "../../Component/GotoTop";
import LoginForm from "../../Component/Form/LoginForm";

function Login() {
    const [isLoading, setIsLoading] = useState(true);
    let content = undefined;
    useEffect(() => {
        setIsLoading(false);
    }, [isLoading]);

    if (isLoading) {
        content = <Preloader />;
    } else {
        content = (
            <>
                <Header logo="assets/images/logosn.png" joinBtn={true} />
                {/* <Banner title="Login" background="assets/images/banner.jpg" /> */}
                <section className="contact-section">
                    <div className="container">
                        <div className="row">


                            <div className="col-md-7">
                                <div className="contact--info-area">
                                    {/* <h3>Get in touch</h3> */}
                                    {/* <p>
                                        Looking for help? Fill the form and start a new adventure.
                                    </p> */}


                                    <div className="banner-thumb mb-4">
                                        <img src="assets/images/login_screen.jpg" alt="" />
                                    </div>



                                    {/* <div className="ab-social">
                                        <h5>Follow Us</h5>
                                        <a className="fac" href="#">
                                            <i className="social_facebook"></i>
                                        </a>
                                        <a className="twi" href="#">
                                            <i className="social_twitter"></i>
                                        </a>
                                        <a className="you" href="#">
                                            <i className="social_youtube"></i>
                                        </a>
                                        <a className="lin" href="#">
                                            <i className="social_linkedin"></i>
                                        </a>
                                    </div> */}
                                </div>
                            </div>




                            <div className="col-md-5">
                                <div className="contact-form">
                                    
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Map /> */}
                {/* <Footer /> */}
                <GotoTop />
            </>
        );
    }
    return content;
}

export default Login;
