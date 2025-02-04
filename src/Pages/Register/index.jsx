import { useEffect, useState } from "react";
import Preloader from "../../Component/Preloader";
import Header from "../../Component/Headers";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import Map from "../../Component/Map";
import GotoTop from "../../Component/GotoTop";
import RegisterForm from "../../Component/Form/RegisterForm";

function Register() {
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
                {/* <Banner title="Register" background="assets/images/banner.jpg" /> */}
                <section className="contact-section">
                    <div className="container">
                        <div className="row">


                            <div className="col-md-1">

                            </div>




                            <div className="col-md-10 d-flex flex-column align-items-center justify-content-center">
                                <h4 className="text-4xl font-semibold text-gray-800 mb-6 text-center uppercase tracking-wider">
                                    REGISTER NOW
                                </h4>
                                <div className="contact-form">
                                    <RegisterForm />
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

export default Register;
