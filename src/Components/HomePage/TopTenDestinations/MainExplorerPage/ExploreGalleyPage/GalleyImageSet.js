
// // List of all possible images
// const allImages = [
//   "/assets/GalleryImages/TopImages/top1.png",
//   "/assets/GalleryImages/TopImages/top2.png",
//   "/assets/GalleryImages/TopImages/top3.png",
//   "/assets/GalleryImages/TopImages/top4.png",
//   "/assets/GalleryImages/TopImages/top5.png",
//   "/assets/GalleryImages/TopImages/top6.png",
//   "/assets/GalleryImages/TopImages/top7.png",
//   "/assets/GalleryImages/TopImages/top8.png",
//   "/assets/GalleryImages/TopImages/top9.png",
//   "/assets/GalleryImages/TopImages/top10.png",
//   "/assets/GalleryImages/TopImages/top11.png",
//   "/assets/GalleryImages/TopImages/top12.png",
//   "/assets/GalleryImages/TopImages/top13.png",
//   "/assets/GalleryImages/TopImages/top14.png",
//   "/assets/GalleryImages/TopImages/top15.png",
// ];

// // Function to shuffle and pick random items from array
// const getRandomImages = (arr, count) => {
//   const shuffled = [...arr].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };

// // Generate Gallery Set
// export const GALLERY_IMAGE_SET = Array.from({ length: 26 }, (_, index) => {
//   const code = (index + 1).toString();
//   const topImages = getRandomImages(allImages, 15).map((img, idx) => ({
//     img,
//     alt: `Person ${idx + 1}`,
//     width: idx < 5 ? "70px" : "35px",
//     height: idx < 5 ? "70px" : "35px",
//     borderRadius: "50%",
//     left: `${Math.floor(Math.random() * 80)}%`,
//     top: `${Math.floor(Math.random() * 80)}%`,
//   }));

//   const bottomImages = getRandomImages(allImages, 8).map((img, idx) => ({
//     img,
//     alt: `Person ${idx + 1}`,
//   }));

//   return {
//     id: index + 1,
//     NAME: `Location ${code}`,
//     CODE: code,
//     topImages,
//     bottomImages,
//   };
// });










export const GALLERY_IMAGE_SET = [
    {
      "id": 1,
      "NAME" : "Chittoor",
      "CODE" : "25",
      "topImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top1.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "20%",
          "top": "30%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top2.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "80%",
          "top": "30%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "65%",
          "top": "8%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top4.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "35%",
          "top": "8%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top5.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "50%",
          "top": "85%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top6.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "68%",
          "top": "42%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "50%",
          "top": "20%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "38%",
          "top": "35%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top9.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "53%",
          "top": "72%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top10.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "58%",
          "top": "52%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top11.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "41%",
          "top": "27%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top12.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "65%",
          "top": "70%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top13.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "70%",
          "top": "58%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top14.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "33%",
          "top": "25%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top15.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "60%",
          "top": "60%"
        }
      ],
      "bottomImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top1.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top2.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top4.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top5.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top6.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1"
        }
      ]
    },
    {
      "id": 2,
      "NAME" : "Tirupati",
      "CODE" : "26",
      "topImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top15.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "20%",
          "top": "30%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top14.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "80%",
          "top": "30%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top13.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "65%",
          "top": "8%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top12.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "35%",
          "top": "8%"
        },
      ],
      "bottomImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top6.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top4.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top1.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top2.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top5.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1"
        }
      ]
    },
    {
      "id": 3,
      "NAME" : "Nellore",
      "CODE" : "18",
      "topImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "50%",
          "top": "20%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top13.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "70%",
          "top": "58%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top10.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "58%",
          "top": "52%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top4.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "35%",
          "top": "8%"
        }
      ],
      "bottomImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top6.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top5.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top4.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top2.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top1.png",
          "alt": "Person 1"
        }
      ]
    },
    {
      "id": 4,
      "NAME" : "Ananthapur",
      "CODE" : "21",
      "topImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top15.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "60%",
          "top": "60%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top11.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "41%",
          "top": "27%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1",
          "width": "70px",
          "height": "70px",
          "borderRadius": "50%",
          "left": "65%",
          "top": "8%"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1",
          "width": "35px",
          "height": "35px",
          "borderRadius": "50%",
          "left": "38%",
          "top": "35%"
        }
      ],
      "bottomImages": [
        {
          "img": "/assets/GalleryImages/TopImages/top5.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top9.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top7.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top6.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top8.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top1.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top3.png",
          "alt": "Person 1"
        },
        {
          "img": "/assets/GalleryImages/TopImages/top2.png",
          "alt": "Person 1"
        }
      ]
    }
  ];
  