import React from 'react';
import "./CulturalEvents.css";
 import image1  from "../CulturalEvents/CulturalEventsImages/image.png";
 import MakarSankranthri from "../CulturalEvents/CulturalEventsImages/Makar-Sankranti-1.jpg";
 import MakarSankranthri2 from "../CulturalEvents/CulturalEventsImages/Makar-Sankranti-3.jpg";
 import Pot1 from "../CulturalEvents/CulturalEventsImages/Pot1.png";
 import Pot2 from "../CulturalEvents/CulturalEventsImages/Pot2.png";
 import backgroundImage from "../CulturalEvents/CulturalEventsImages/background.png";
let events = [
  {
    name: "lorem Ipsum",
    desc: "Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring",
    position: "right"
  },
  {
    name: "lorem Ipsum",
    desc: "Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring",
    position: "right"
  },
  {
    name: "lorem Ipsum",
    desc: "Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring",
    position: "left"
  },
  {
    name: "lorem Ipsum",
    desc: "Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring",
    position: "left"
  },
  {
    name: "lorem Ipsum",
    desc: "Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring",
    position: "right"
  },
];
 
const TimelineItem = ({ event }) => {
  return (
    <div className={`container ${event.position}-container`}>
      <div className="dot"></div>
      <div className="textbox">
        <div className="title">
          <h1>{event.name}</h1>
        </div>
        <p>{event.desc}</p>
      </div>
    </div>
  );
};
 
function CulturalEvents() {
  return (
    <>
      <div>
        
 
        <section className="hero">
 
          <h1>Makara <span >Sankranti </span></h1>
          <div className="countdown">
            <div><span>05</span> Days</div>
            <div><span>30</span> Hours</div>
            <div><span>15</span> Min</div>
            <div><span>05</span> Sec</div>
          </div>
        </section>
 
        <section className="about">
          <div className="about-content">
            <div className="about-left">
              <img src={image1}alt="About-Image" />
            </div>
            <div className="about-right">
              <h1>About</h1>
              <h2>Makara Sankranti</h2>
              <p>
                Starting our voyage with Makar Sankranti, a captivating festival that marks the arrival of spring, it is more than just the celebration of a season. It is an occasion where households are embellished with vibrant “muggu” (rangoli), and courtyards are adorned with decorative cow-dung balls called “Gobbemma”. In a unique aerial spectacle, the azure sky transforms into a canvas painted with thousands of multicolored kites, symbolizing the cutting of past negativity and the ushering in of hope. The harmonious humdrum of people flying kites, engaging in friendly duels, and rejoicing under the warm sun embodies an ineffable joy that resonates with the spirit of Sankranti.              </p>
            </div>
          </div>
        </section>
 
{/*
        <section className="highlights">
          <h2>Event Highlights</h2>
          <section className="timeline-container">
            <div className="timeline">
              {events.map((event, index) => (
                <div key={index} className={`timeline-item ${event.position}`}>
                  <div className="timeline-content">
                    <h3>{event.name}</h3>
                    <p>{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section> */}
 
 <section className="highlights">
  <h2 className="event-heading">Event Highlights</h2>

  <img src={MakarSankranthri} alt="MakarSankranthri" className="img img-1" />
  <img src={MakarSankranthri2} alt="" className="img img-2" />
  <img src={Pot1} alt="" className="img img-3" />
  <img src={Pot2} alt="" className="img img-4" />
  <img src={Pot2} alt="" className="img img-5" />
  <img src={backgroundImage} alt="" className="img img-6" />

  <div className="timeline">
    {events.map((event, index) => (
      <div key={index} className={`timeline-item ${event.position}`}>
        <div className="timeline-content">
          <h3>{event.name}</h3>
          <p>{event.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>
        <section className="upcoming">
          <h2>Upcoming Events</h2>
          <div className="cards">
            <div className="card">
              <img src={MakarSankranthri2} alt="Event 1" />
              <div className="date"><h1>On</h1><p>Date</p></div>
              <div className="details"><h1>Event Name</h1><p>Place</p></div>
            </div>
            <div className="card">
              <img src={MakarSankranthri} alt="Event 2" />
              <div className="date"><h1>On</h1><p>Date</p></div>
              <div className="details"><h1>Event Name</h1><p>Place</p></div>
            </div>
            <div className="card">
              <img src={MakarSankranthri2} alt="Event 3" />
              <div className="date"><h1>On</h1><p>Date</p></div>
              <div className="details"><h1>Event Name</h1><p>Place</p></div>
            </div>
          </div>
        </section>
 
        <footer>
          <div className="footer-columns">
            <div><h4>About Us</h4><a href="#">my city</a></div>
            <div><h4>Quick Links</h4><p><a href="#">Contact us</a><br /><a href="#">Events</a></p></div>
            <div><h4>Contact</h4><p>+91 9876543210</p><br /><p>email@example.com</p><br /><p>XYZ Road, Andhra Pradesh, India</p></div>
          </div>
          <div className="socials"><span>© 2025 | Follow us: FB IG TW</span></div>
        </footer>
      </div>
    </>
  );
}
 
export default CulturalEvents;