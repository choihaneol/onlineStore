
import Header from "./Header";
import { createTheme, ThemeProvider,Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import HomePage from "../../features/home/HomePage";
import { Routes, Route } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
 



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
        </Routes>
    

      </Container>
    </ThemeProvider>
      
  );
}

export default App;


