import React from 'react';
import { Container } from 'react-bootstrap';
import { FaHome, FaUtensils, FaTv, FaQuoteLeft, FaWrench, FaSnowflake, FaTools, FaUserTie, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>The best solution for every house problem.</h1>
                        <p>Our open, positive, and proactive approach helps us find ways to align your work environment with the culture.</p>
                        <p>We pride ourselves on our customer-centric approach, ensuring that every service is tailored to meet your unique needs. Our team consists of highly skilled and verified professionals who bring years of experience to deliver the best solutions.</p>
                        <Link to="/services" className="btn btn-dark">Explore Services</Link>
                    </div>
                    <img src="/assets/img/thumb.png" alt="why choose us" className="hero-img" />
                </section>

                {/* Why Choose us Section */}
                <section className="why-choose-us">
                    <div className="why-choose-img">
                        <img src="/assets/img/why.png" alt="why choose us" />
                    </div>
                    <div className="why-choose-content">
                        <h3>Why Choose Us?</h3>
                        <p>We are committed to providing top-notch services with expert professionals to handle all your needs efficiently.</p>
                        <p>At CLIQUES, we are dedicated to providing top-notch home and repair services. With a team of experienced professionals, we ensure quality and reliability in every service we offer. Whether you need home cleaning, plumbing, AC repair, or food delivery, we have got you covered. Our goal is to make your life easier with hassle-free, efficient, and trustworthy services.</p>
                        <ul className='mb-5'>
                            <li>✔ Experienced and Skilled Professionals</li>
                            <li>✔ Quick and Reliable Service</li>
                            <li>✔ Affordable and Transparent Pricing</li>
                            <li>✔ 24/7 Customer Support</li>
                        </ul>
                        <Link to="/aboutus" className="btn-theme mt-4">Learn More</Link>
                    </div>
                </section>

                {/* Service Highlights */}
                <section className="highlights">
                    <div className="highlight-box">
                        <FaUserTie className="highlight-icon" />
                        <h3>Professional Expertise</h3>
                        <p>Skilled professionals delivering top-quality services for all your needs.</p>
                    </div>

                    <div className="highlight-box">
                        <FaShieldAlt className="highlight-icon" />
                        <h3>Reliable Service</h3>
                        <p>Timely, trustworthy, and efficient services you can count on.</p>
                    </div>

                    <div className="highlight-box">
                        <FaDollarSign className="highlight-icon" />
                        <h3>Affordable Rates</h3>
                        <p>High-quality services at prices that fit your budget.</p>
                    </div>
                </section>


                {/* Services Section */}
                <section className="services">
                    <h2>Explore our comprehensive range of <br /> professional services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <FaHome className="service-icon" />
                            <h3>Home Service</h3>
                            <p>Expert home maintenance, cleaning, and repair solutions to keep your house in perfect shape.</p>
                        </div>

                        <div className="service-card">
                            <FaUtensils className="service-icon" />
                            <h3>Food Service</h3>
                            <p>Delicious meals delivered to your doorstep, prepared by top chefs with fresh ingredients.</p>
                        </div>

                        <div className="service-card">
                            <FaTv className="service-icon" />
                            <h3>Electronic Service</h3>
                            <p>Repair and maintenance for all your electronic appliances, from TVs to home theater systems.</p>
                        </div>

                        <div className="service-card">
                            <FaWrench className="service-icon" />
                            <h3>Plumber Service</h3>
                            <p>Professional plumbing solutions including leak repairs, installations, and maintenance.</p>
                        </div>

                        <div className="service-card">
                            <FaSnowflake className="service-icon" />
                            <h3>AC Repair</h3>
                            <p>Cooling system repairs, maintenance, and installation to keep your home comfortable year-round.</p>
                        </div>

                        <div className="service-card">
                            <FaTools className="service-icon" />
                            <h3>All Kind of Services</h3>
                            <p>From handyman services to deep cleaning, we provide everything to meet your needs.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonials-container">

                        <div className="testimonial-card">
                            <FaQuoteLeft className="quote-icon" />
                            <p>“Their expertise and efficiency in handling tasks, like fixing my electrical issues, were impressive.”</p>
                            <h4>- Aaron Hently</h4>
                        </div>

                        <div className="testimonial-card">
                            <FaQuoteLeft className="quote-icon" />
                            <p>“Superb service! The team was professional and fixed my plumbing issues quickly. Highly recommend.”</p>
                            <h4>- Jessica Williams</h4>
                        </div>

                        <div className="testimonial-card">
                            <FaQuoteLeft className="quote-icon" />
                            <p>“Fast and affordable! Got my AC repaired in no time. The team was very friendly and efficient.”</p>
                            <h4>- Michael Roberts</h4>
                        </div>

                    </div>
                </section>


            </div>
        </Container>
    );
};

export default Home;
