import { ThemeProvider } from "@emotion/react";
import { ContactPage } from "@mui/icons-material";
import { createTheme, CssBaseline, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agents";
import NotFound from "../api/errors/NoFound";
import ServerError from "../api/errors/ServerError";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";


function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); //darkmode function (start with light mode) 


  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false)); //setLoading(true)가 true 일 때만 
    }else{
      setLoading(false);
    }
  }, [setBasket])


  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initialising ap...' />


  return (
    //catalog component에 products, addProduct 추가  
    <ThemeProvider theme={theme}>
      {/* toast */}
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />

      { /* dark mode */}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        { /* router */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </Container>
    </ThemeProvider>

  );
}

export default App;

