import React from "react";
import "./ExploreAboutPage.css";

const AboutExplore = () => {
  return (
    <>
      <div className="main-container">
        <div className="right-container">
          <div>
            <h1>History</h1>
            <br />
            <p>
              Maredumilli has a rich history closely connected to the tribal
              communities living in the Eastern Ghats of Andhra Pradesh. It was
              originally inhabited by indigenous tribal groups who depended on
              the forests for their livelihood. During the British era,
              Maredumilli's dense forests were explored for timber and other
              natural resources. Over time, the Andhra Pradesh Forest Department
              took steps to preserve the region’s biodiversity and promote
              eco-tourism. Today, Maredumilli is not only a tourist destination
              but also a place where traditional tribal culture and heritage are
              preserved, showcasing the harmony between nature and the local
              communities.
            </p>
          </div>
        </div>

        <div className="left-container">
          <img
            src="./assets/images/ExploreImages/explorebg1.jpeg"
            alt="Back ground"
          />
        </div>
      </div>

      <div>
        <div className="left-container-2">
          <div>
            <h1>About</h1>
            <br />
            <p>
              Maredumilli is a beautiful hill station located in the Eastern
              Ghats of Andhra Pradesh. It is known for its lush green forests,
              waterfalls, and scenic viewpoints. The region is home to a rich
              variety of flora and fauna, making it a popular spot for nature
              lovers. Tourists visit Maredumilli for trekking, camping, and
              exploring the tribal culture. The Jalatarangini and Amruthadhara
              waterfalls are major attractions here. Maredumilli offers a
              refreshing escape into nature, away from city life.
            </p>

            <div>
              <h2>Visiting Hours</h2>
              <p>9Am to 5Pm</p>
            </div>
          </div>
        </div>

        <div className="right-container-2">
          <img
            src="./assets/images/ExploreImages/explorebg1.jpeg"
            alt="Back ground"
          />
        </div>
      </div>
    </>
  );
};

export default AboutExplore;
