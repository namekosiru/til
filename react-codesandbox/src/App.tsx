import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { Router } from "./router/Router";
export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}
