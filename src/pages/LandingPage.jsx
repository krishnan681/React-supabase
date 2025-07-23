import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../Css/LandingPage.css";

//supabase
import { supabase } from '../services/supabaseClient';

//swiper..................
// CSS imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "aos/dist/aos.css";

// AOS init (typically inside useEffect)
import AOS from "aos";

// Swiper imports (only once!)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

//animation for text changing...
import RotatingText from "../Components/RotatingText";

//animation for rotating text...
import CircularText from "../Components/CircularText";

//images...
import MachineryImg from "../assets/images/Machinery.webp";
import ElectricalImg from "../assets/images/Electrical.webp";
import CNCImg from "../assets/images/CNC.webp";
import MotorImg from "../assets/images/Motor.webp";
import WaterPumpImg from "../assets/images/WaterPump.webp";
import TextilesImg from "../assets/images/Textiles.webp";
import MobileOne from "../assets/Images/Mobile-about_app.png";
import MobileTwo from "../assets/Images/Mobile-about_app2.png";

const LandingPage = () => {

  const [recentRecords, setRecentRecords] = useState([]);
  const [premiumRecords, setPremiumRecords] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/directory?query=${query}`);
    }
  };
  // aos+ Swiper....................
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // fetch data from supabase

   useEffect(() => {
    const fetchRecentData = async () => {
  const { data, error } = await supabase
    .from('Directory_Data')
    .select('*')
    .order('user_id', { ascending: false }) // or 'created_at' if you add it
    .limit(10);

  if (!error) {
    setRecentRecords(data);
  }
};


    fetchRecentData();
  }, []);

  const productCategories = [
    { title: "Clothing", img: MachineryImg },
    { title: "Xerox", img: ElectricalImg },
    { title: "CNC", img: CNCImg },
    { title: "Thread Rolling", img: MotorImg },
    { title: "Pumps Sets", img: WaterPumpImg },
    { title: "Industrial Packing", img: TextilesImg },
  ];

  const industrialCategories = [
    {
      title: "Machinery",
      bg: "#e0f7fa",
      items: [
        {
          name: "Clothing",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Lathe",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Drilling",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Cutting",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
    {
      title: "Electrical",
      bg: "#fce4ec",
      items: [
        {
          name: "Motors",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Wiring",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Batteries",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Panels",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
    {
      title: "Hardware",
      bg: "#f9fbe7",
      items: [
        {
          name: "Bearings",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Pipes",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Fasteners",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Valves",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
  ];

  return (
    <>
      <div className="hero-section d-flex flex-column align-items-center justify-content-center text-white position-relative">
        <h2 className="hero-title fw-bold text-center">
          Find Anyone, Anywhere and Promote Your Business
        </h2>

        <p className="text-center fs-5">
          Discover your customers nearby, attract them with your offers &
          discounts.
        </p>

        <div className="d-flex align-items-center gap-2 fs-4 fw-bold mt-2">
          <span className="hero-static-text text-light">
            Search by category like
          </span>
          <div className="rotating-box px-3 py-1 rounded">
            <RotatingText
              texts={[
                "Industrial Machinery",
                "MSME Services",
                "Electrical Panels",
                "CNC Lathe Experts",
              ]}
              mainClassName="text-white fw-bold"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>

        <Form onSubmit={handleSearch} className="search-box d-flex mt-3 w-50">
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Business Name or products"
            className="Searchbox rounded-0 flex-grow-1"
          />
          <Button type="submit" variant="warning" className="rounded-0">
            <FaSearch />
          </Button>
        </Form>

        {/* <div className="landing-image-background position-absolute w-100 h-100"></div> */}
      </div>

      {/* Industrial Products Carousel Style Section */}

      <div className=" container my-5 position-relative">
        <h2 className="text-center fw-bold" data-aos="fade-up">
          Search By Industrial Products
        </h2>
        <p
          className="text-center text-muted"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Explore manufacturers and businesses by your preferred category
        </p>

        <div className="px-3 py-4" data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
            }}
          >
            {productCategories.map((item, index) => (
              <SwiperSlide key={index}>
  <div
    className="text-center cursor-pointer"
    onClick={() => navigate(`/directory?query=${item.title}`)}
    style={{ cursor: "pointer" }}
  >
    <div
      className="mb-2 mx-auto"
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        className="w-100 h-100 object-fit-cover"
      />
    </div>
    <div className="fw-semibold text-dark small">{item.title}</div>
  </div>
</SwiperSlide>

            ))}
          </Swiper>
        </div>
      </div>

      {/* Industrial Categories */}
      <div className="container ">
        <Row>
          {industrialCategories.map((category, i) => (
            <Col md={4} key={i} className="mb-2">
              <div
                className="p-3 rounded h-100"
                style={{ background: category.bg }}
              >
                <h5 className="fw-bold">{category.title}</h5>
                <div className="d-flex flex-wrap gap-3 mt-3 IndustrialCategories_Colored">
                  {category.items.map((item, j) => (
                    <div
                      className="text-center cursor-pointer"
                      onClick={() => navigate(`/directory?query=${item.name}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-circle mb-1"
                        width={40}
                        height={40}
                      />
                      <div style={{ fontSize: 14 }}>{item.name}</div>
                    </div>
                  ))}
                </div>
                <div className="text-end mt-2">
                  <a href="#" className="text-primary fw-bold">
                    View all
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Featured Stats Section */}

      <div className="featured-stats-section text-dark position-relative py-5">
        <div className="overlay-bg"></div>
        <div className="container featured-Section ">
          <Row className="align-items-center gy-4">
            {/* Left Content */}
            <Col lg={6} md={12}>
              <h2 className="fw-bold mb-3">
                Discover Our More than 15,000 Listings,
              </h2>
              <p className="mb-4 text-dark">
                We connect you to the best suppliers in the industry. Our
                directory makes discovering, comparing, and connecting seamless.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Stay connected
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Modern Listings
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Verified Businesses
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Well Organized
                  Theme
                </li>
              </ul>

              <Row>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">6k</h2>
                  <p className="text-dark">Our Happy Clients</p>
                </Col>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">10k</h2>
                  <p className="text-dark">Total Verified Listings</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">6k</h2>
                  <p className="text-dark">Our Happy Clients</p>
                </Col>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">10k</h2>
                  <p className="text-dark">Total Verified Listings</p>
                </Col>
              </Row>
            </Col>

            {/* Right Image */}
            <Col lg={6} md={12} className="position-relative text-center">
              <div className="d-inline-block position-relative img-half-container">
                <CircularText
                  text="100%*Secured*Trust Worthy*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="rotated-circle"
                />
                <img
                  src={MobileOne}
                  className="floating-img img-fluid"
                  alt="main"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* About Us Section */}
      <div className="section-container">
        <Row>
          <Col>
            <h3 className="text-center">About Us</h3>
            <p className="text-center">
              At Signpost PHONE BOOK, we are dedicated to connecting businesses
              with their target audience. Our platform offers a comprehensive
              database of MSMEs, making it easier for you to promote your
              services and reach potential customers.
            </p>
          </Col>
        </Row>
      </div>

      {/* Recently Added Lists */}
      <div className="section-container mb-5">
        <h3 className="fw-bold mb-3">Recently Added Lists</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {recentRecords.map((business, i) => (
            <SwiperSlide key={i}>
              <div className="business-card border rounded px-3 py-3 h-100">
                <h6 className="fw-bold">{business.name}</h6>
                <p className="text-muted mb-2">{business.location || 'Location not available'}</p>
                <button className="btn btn-warning btn-sm">Enquire Now</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recently Added Premium Lists */}
      <div className="section-container mb-5">
        <h3 className="fw-bold mb-3">Recently Added Premium Lists</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            992: { slidesPerView: 3 },
          }}
        >
          {premiumRecords.map((business, i) => (
            <SwiperSlide key={i}>
              <div className="business-card border rounded px-3 py-3 h-100 position-relative">
                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                  PREMIUM
                </span>
                {business.image && (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-100 mb-2 rounded"
                    style={{ height: 150, objectFit: 'cover' }}
                  />
                )}
                <h6 className="fw-bold">{business.name}</h6>
                {business.rating && (
                  <p className="mb-1">
                    <span className="text-warning">★ {business.rating}</span>{' '}
                    <small>({business.reviews} Reviews)</small>
                  </p>
                )}
                <p className="text-muted mb-2">{business.location || business.address}</p>
                <button className="btn btn-warning btn-sm">Enquire Now</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Testimonials Section */}
      <div className="section-container">
        <Row>
          <Col>
            <h3 className="text-center">Testimonials</h3>
            <div className="text-center">
              <p className="testimonial-quote">
                "Signpost PHONE BOOK has transformed the way we reach our
                customers!" - Business Owner
              </p>
              <p className="testimonial-quote">
                "The platform is user-friendly and effective for our marketing
                needs." - Marketing Manager
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Contact Us Section */}
      <div className="section-container">
        <Row>
          <Col>
            <h3 className="text-center">Contact Us</h3>
            <p className="contact-detail text-center">
              For inquiries, please reach out to us at:
            </p>
            <p className="contact-detail text-center">
              Email: support@signpostphonebook.com
            </p>
            <p className="contact-detail text-center">Phone: 95145 55132</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LandingPage;
