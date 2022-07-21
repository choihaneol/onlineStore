
import Header from "./Header";
import { createTheme, ThemeProvider,Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import HomePage from "../../features/home/HomePage";
import { Routes, Route } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../api/errors/ServerError";
import NotFound from "../api/errors/NoFound";
 

function App() {

  const[darkMode, setDarkMode] = useState(false); //darkmode function (start with light mode) 

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme ({
    palette: {
      mode : paletteType,
      background:{
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
}


  return (
    //catalog component에 products, addProduct 추가  
    <ThemeProvider theme={theme}>
      {/* toast */}
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline />

      { /* dark mode */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
      { /* router */}
        <Routes>
        <Route path="/" element={<HomePage/>} />  
        <Route path="/catalog" element={<Catalog/>} />  
        <Route path="/catalog/:id" element={<ProductDetails/>} />  
        <Route path="/about" element={<AboutPage/>} />  
        <Route path="/contact" element={<ContactPage/>} />  
        <Route path="/server-error" element={<ServerError/>} />  
        <Route path='*' element={<NotFound />} />
        </Routes>

      </Container>
    </ThemeProvider>
      
  );
}

export default App;


