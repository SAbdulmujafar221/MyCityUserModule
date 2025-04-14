// import React , {useState} from 'react'

// const ExploreChangingPages = () => {
//     const [activePage, setActivePage] = useState('about');

//     const renderPage = () => {
//       switch (activePage) {
//         case 'contact':
//           return < />;
//         case 'services':
//           return < />;
//         default:
//           return < />;
//       }
//     };
  
//     return (
//       <div className="app-container">
//         <nav className="nav-bar">
//           <button onClick={() => setActivePage('about')} className={`nav-button ${activePage === 'about' ? 'active' : ''}`}>About</button>
//           <button onClick={() => setActivePage('contact')} className={`nav-button ${activePage === 'contact' ? 'active' : ''}`}>Contact</button>
//           <button onClick={() => setActivePage('services')} className={`nav-button ${activePage === 'services' ? 'active' : ''}`}>Services</button>
//         </nav>
  
//         <div className="page-content">{renderPage()}</div>
//       </div>
//     );
//   };
  

// export default ExploreChangingPages