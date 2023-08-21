import React from 'react';
import HeroSec from "./hero";
import InfoPage from "./info";
import Footer from "../Dashboard/Graph";
import FooterPa from "../Dashboard/footer";
import Testimonios from "./Testimonials";

const LandingPage = () => {
    return (
        <div>
            <HeroSec/>
            <InfoPage/>
            <Testimonios/>
            <FooterPa/>
            <Footer/>

        </div>
    );
};

export default LandingPage;
