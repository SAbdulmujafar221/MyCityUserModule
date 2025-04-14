import React, { useEffect, useState } from "react";
import "./Districts.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { motion } from "framer-motion";
import DistrictsImageSlider from "./ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
const imageUrls = [
  "/images/image-1.jpg",
  "./assets/images/district-images/image-1.jpg",
  "./assets/images/district-images/image-6.jpg",
  "./assets/images/district-images/image-3.jpg",
  "./assets/images/district-images/image-4.jpg",
  "./assets/images/district-images/image-5.jpg",
];

const AndhraPradeshMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [fixColor, setFixColor] = useState(false);

  useEffect(() => {
    const width = 500;
    const height = 500;

    const svg = d3
      .select("#ap-map")
      .attr("width", width)
      .attr("height", height);

    d3.json("/districts.json")
      .then((data) => {
        const geojson = topojson.feature(data, data.objects.districts);

        const projection = d3.geoMercator().fitSize([width, height], geojson);
        const path = d3.geoPath().projection(projection);
        const firstDistrict = geojson.features[0];
        const smallProjection = d3.geoMercator().fitSize([300, 300], {
          type: "FeatureCollection",
          features: [firstDistrict],
        });
        const smallPath = d3.geoPath().projection(smallProjection)(
          firstDistrict
        );

        setSelectedDistrict({
          ...firstDistrict.properties,
          path: smallPath,
        });
        setFixColor(true);

        svg
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "district")
          .attr("fill", (d, i) =>
            d === firstDistrict && fixColor ? "#8b5cf6" : "white"
          )
          .attr("stroke", "#8b5cf6")
          .attr("stroke-width", 1)
          .on("mouseover", (event) => {
            d3.select(event.target).style("fill", "#8b5cf6");
          })
          .on("mouseout", (event, d) => {
            if (fixColor && d === firstDistrict){
              return d3.select(event.target).style("fill", "#8b5cf6");
            } else {
              return d3.select(event.target).style("fill", "white");
            }
          })
          .on("click", (event, d) => {
            const selectedPath = d;
            const smallProjection = d3.geoMercator().fitSize([300, 300], {
              type: "FeatureCollection",
              features: [selectedPath],
            });
            const smallPath = d3.geoPath().projection(smallProjection)(
              selectedPath
            );

            console.log("Small Path:", smallPath);

            d3.select(event.target).style("fill", "#8b5cf6");
            setFixColor(true);

            setSelectedDistrict({
              ...d.properties,
              path: smallPath,
            });
          });
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <>
      <img
        src="./assets/images/home-images/img3.jpg"
        alt="India Map"
        className="district-background-image"
      />
      <div className="district-container">
        <div className="district-map-wrapper">
          <svg id="ap-map" className="district-map"></svg>
        </div>

        <div className="district-info-wrapper">
          {selectedDistrict && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="district-info-card"
            >
              <h2 className="district-info-heading">
                {selectedDistrict.NAME || "Unknown"}
              </h2>
              <svg className="district-info-svg">
                {selectedDistrict.path ? (
                  <path
                    d={selectedDistrict.path}
                    fill="#8b5cf6"
                    stroke="black"
                    strokeWidth="0.5"
                  />
                ) : (
                  <text x="50%" y="50%" textAnchor="middle" fill="red">
                    Invalid Path
                  </text>
                )}
              </svg>
              <div className="district-info-text">
                <p>
                  <strong>Capital:</strong>{" "}
                  {selectedDistrict.CAPITAL || "Data Not Available"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedDistrict.DESCRIPTION || "N/A"}
                </p>
              </div>
              <Link to="/MainExplorePlorer">
                <button className="district-info-button">Explore</button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
      <DistrictsImageSlider />
      {/* <div  className="district-slider-component">
      
      </div> */}
    </>
  );
};

export default AndhraPradeshMap;
