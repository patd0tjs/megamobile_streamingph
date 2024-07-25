import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./component/Article";
import Checkout from "./component/Checkout";
import Home from "./component/Home";
import Payment from "./component/Payment";
import Plans from "./component/Plans";
import ContextProvider from "./context/Context";
import Redirection from "./component/Redirection";
import Redeem from "./component/Redeem";

//Create QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        {/* <BrowserRouter basename="streaming_ph"> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/plans" element={<Plans />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/redeem" element={<Redeem />} />
            <Route exact path="/article/:link" element={<Article />} />
            <Route exact path="*" element={<Redirection />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
