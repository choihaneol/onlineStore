
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { createTheme, ThemeProvider,Container, CssBaseline } from "@mui/material";
import { useState } from "react";

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
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
      <Catalog />
      </Container>
    </ThemeProvider>

  );
}

export default App;
