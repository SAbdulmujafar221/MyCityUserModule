import React, { useEffect, useState } from "react";
import "./Districts.css";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { motion } from "framer-motion";
import DistrictsImageSlider from "./ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import Line from "../../AnimatedLines/CurvyLine";
import SLine from "../../AnimatedLines/StraightLine";
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
            d === firstDistrict && fixColor ? "#fff" : "#999"
          )
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .on("mouseover", (event) => {
            d3.select(event.target).style("fill", "#fff");
          })
          .on("mouseout", (event, d) => {
            if (fixColor && d === firstDistrict) {
              return d3.select(event.target).style("fill", "#8b5cf6");
            } else {
              return d3.select(event.target).style("fill", "#999");
            }
          })
          .on("click", (event, d) => {
            const selectedPath = d;
            d3.select(event.target).style("fill", "#8b5cf6");
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
      <div className="districts-background">
        <div>
          <h1 className="district-title">Local Highlights</h1>
        </div>
        <div className="district-container">
          <div className="event-local-treasures-overlay" />

          <div className="district-map-wrapper">
            <svg id="ap-map" className="district-map"></svg>
          </div>

          <SLine />
          <div className="district-info-wrapper">
            {selectedDistrict && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="district-info-card"
              >
                {/* Image on Top */}
                <img
                  src={`./assets/images/district-images/${
                    selectedDistrict.NAME?.toLowerCase().replace(/\s+/g, "-") ||
                    "default"
                  }.jpg`}
                  alt={selectedDistrict.NAME}
                  className="district-top-image"
                />

                {/* Description */}
                <div className="district-info-text big-description">
                  <h2 className="district-name">{selectedDistrict.NAME}</h2>
                  <p>
                    {selectedDistrict.DESCRIPTION ||
                      "This is a beautiful district in Andhra Pradesh, rich in culture, tradition, and natural beauty. More specific information will be available soon."}
                  </p>
                </div>
                <Link to="/Districts">
                  <div className="district-explore-button">
                    <button>Explore</button>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        <DistrictsImageSlider />
      </div>
    </>
  );
};

export default AndhraPradeshMap;
