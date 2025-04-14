import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { motion } from "framer-motion";
import "./ExploreGalleyPage.css";
import { GALLERY_IMAGE_SET } from "./GalleyImageSet";

const ExploreGalleryPage = () => {
  const [activeImages, setActiveImages] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtName, setDistrictName] = useState( "");

  const [hasSelectedDefault, setHasSelectedDefault] = useState(false);

  const selectDistrict = (district, svg, paths) => {
    svg.selectAll("path").style("fill", "white");
    paths
      .filter((d) => d.properties.CODE === district.properties.CODE)
      .style("fill", "#8b5cf6");

    const matchedImages = GALLERY_IMAGE_SET.find(
      (set) =>
        String(set.CODE).trim() === String(district.properties.CODE).trim()
    );

    setActiveImages(matchedImages || GALLERY_IMAGE_SET[0]);
    setSelectedDistrict({
      ...district.properties,
    });
  };

  useEffect(() => {
    const width = 500;
    const height = 500;

    const svg = d3
      .select("#ap-map")
      .attr("width", width)
      .attr("height", height);

    d3.json("/Districts.json")
      .then((data) => {
        const geojson = topojson.feature(data, data.objects.districts);
        console.log("GeoJSON features:", geojson.features); // Debug GeoJSON data

        const projection = d3.geoMercator().fitSize([width, height], geojson);
        const path = d3.geoPath().projection(projection);

        const paths = svg
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "district")
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .on("mouseover", (event, d) => {
            d3.select(event.target).style("fill", "#8b5cf6");
            d3.select(event.target).style("cursor", "pointer");

             setDistrictName ( d.properties.NAME);

            
            console.log("present = " + districtName);
          })
          .on("mouseout", (event) => {
            setDistrictName("");
            if (
              selectedDistrict?.CODE !==
              d3.select(event.target).datum().properties.CODE
            ) {
              d3.select(event.target).style("fill", "white");
            }
          })
          .on("click", (event, d) => {
            d3.select(event.target).style("fill", "#8b5cf6");
            selectDistrict(d, svg, paths);
            setHasSelectedDefault(true);
          });

        if (!hasSelectedDefault) {
          const firstDistrict = geojson.features[0];
          if (firstDistrict) {
            selectDistrict(firstDistrict, svg, paths);
            setHasSelectedDefault(true);
          } else {
            setActiveImages(GALLERY_IMAGE_SET[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error loading GeoJSON:", error);
        setActiveImages(GALLERY_IMAGE_SET[0]);
      });
  }, [hasSelectedDefault]);

  return (
    <div className="explore-gallery-container">
      <h1 className="explore-gallery-heading">Memories</h1>
      <div className="gallery-map-image-wrapper">
        <div className="gallery-map-wrapper">
          <svg id="ap-map" className="gallery-map"></svg>
        </div>

        { (
          <div className="district-tooltip">{districtName} </div>
        )}

        <div className="gallery-circle-images">
          {selectedDistrict &&
          activeImages &&
          activeImages.topImages &&
          activeImages.topImages.length > 0 ? (
            <div>
              {activeImages.topImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.img}
                  alt={image.alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="gallery-circle-image"
                  style={{
                    width: image.width,
                    height: image.height,
                    borderRadius: image.borderRadius,
                    left: image.left,
                    top: image.top,
                    border: "2px solid #fff",
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="gallery-main-images">
        <h2 className="gallery-main-images-heading">Gallery</h2>
        <div className="gallery-images-grid">
          {activeImages &&
          activeImages.bottomImages &&
          activeImages.bottomImages.length > 0 ? (
            activeImages.bottomImages.map((image, index) => (
              <motion.img
                key={index}
                src={image.img}
                alt={image.alt}
                className="gallery-main-image"
                style={{
                  width: "300px",
                  height: "200px",
                  margin: "10px",
                  borderRadius: "12px",
                }}
                whileHover={{ scale: 1.1 }}
              />
            ))
          ) : (
            <p>Loading images...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreGalleryPage;
