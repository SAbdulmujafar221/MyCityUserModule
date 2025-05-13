import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "./TripPlanner.css";
import { Link } from "react-router";
import Vishakapatanam from "./TripPlannerImages/Annamayya district.png";
import NTRDistrict from "./TripPlannerImages/NTR district.png";
import AnnamayyaDistrict from "./TripPlannerImages/Annamayya district.png";
import Kurnool from "./TripPlannerImages/Annamayya district.png";
import AlluriSitharamaRaju from "./TripPlannerImages/Annamayya district.png"; // Fixed wrong image import
import Srikakulam from "./TripPlannerImages/Srikakulam.png";
import Prakasam from "./TripPlannerImages/Annamayya district.png";
import EastGodavari from "./TripPlannerImages/Annamayya district.png";
import Nellore from "./TripPlannerImages/Annamayya district.png";

const TripPlanner = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const width = document.querySelector(
      ".trip-planner-map-container"
    ).offsetWidth;
    const height = document.querySelector(
      ".trip-planner-map-container"
    ).offsetHeight;
    const svg = d3
      .select("#trip-planner-ap-map")
      .attr("class", "trip-planner-zoom-effect");
    const tooltip = document.getElementById("trip-planner-tooltip");

    d3.json("/Districts.json")
      .then((data) => {
        const geojson = topojson.feature(data, data.objects.districts);
        const projection = d3.geoMercator().fitSize([width, height], geojson);
        const path = d3.geoPath().projection(projection);

        svg
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "trip-planner-district")
          .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).style("fill", "skyblue");
            tooltip.style.display = "block";
            tooltip.style.left = event.pageX + 10 + "px";
            tooltip.style.top = event.pageY + 10 + "px";
            tooltip.innerHTML = `<strong>${d.properties.NAME}</strong>`;

            console.log("x = " + event.pageX + "," + "y = " + event.pageY)
          })
          // .on("mousemove", (event) => {
          //   tooltip.style.left = event.pageX + 10 + "px";
          //   tooltip.style.top = event.pageY + 10 + "px";
          // })
          .on("mouseout", (event) => {
            d3.select(event.currentTarget).style("fill", "white");
            tooltip.style.display = "none";
          });

        const districtImageMap = {
          Visakhapatnam: Vishakapatanam,
          "NTR District": NTRDistrict,
          "Annamayya District": AnnamayyaDistrict,
          Kurnool: Kurnool,
          "Alluri Sitharama Raju": AlluriSitharamaRaju,
          Srikakulam: Srikakulam,
          Prakasam: Prakasam,
          "East Godavari": EastGodavari,
          "sri potti sriramulu Nellore": Nellore,
        };

        svg
          .selectAll("image.trip-planner-district-icon")
          .data(
            geojson.features.filter((d) => districtImageMap[d.properties.NAME])
          )
          .enter()
          .append("image")
          .attr("class", "trip-planner-district-icon")
          .attr("x", (d) => path.centroid(d)[0] - 35)
          .attr("y", (d) => path.centroid(d)[1] - 35)
          .attr("width", 50)
          .attr("height", 50)
          .attr("href", (d) => districtImageMap[d.properties.NAME]);

        setTimeout(() => setMapLoaded(true), 3000); // Trigger the map animation after zoom effect
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <div className="trip-planner-map-main-container">
      <img
        src="./assets/images/home-images/img3.jpg"
        alt="India Map"
        className="trip-planner-background-image"
      />
      <div className="trip-planner-background-overlay"></div>
      <div
        className={`trip-planner-container ${
          mapLoaded ? "trip-planner-show-cards" : ""
        }`}
      >
        
        <div className="trip-planner-map-container trip-planner-animated-map">
          <svg id="trip-planner-ap-map" width="100%" height="100%"></svg>
        </div>
        <div id="trip-planner-tooltip" className="trip-planner-tooltip"></div>
        <div className="trip-planner-cards-container">
          <div className="trip-planner-card trip-planner-transparent-card trip-planner-card1">
            <h2>
              Plan My Trip - Your <br /> Personal Itinerary
            </h2>
            <p>
              Our trip planner makes your <br /> holiday booking a pleasure.{" "}
              <br /> Set the dates and pick your <br /> activities - we’ll guide
              you <br /> through the rest
            </p>
            <Link to="/SubTripPlanner">
              <button className="trip-planner-card1-button">Know More</button>
            </Link>
          </div>
          <div className="trip-planner-card trip-planner-transparent-card trip-planner-card2"></div>
          <div className="trip-planner-card trip-planner-transparent-card trip-planner-card3"></div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
