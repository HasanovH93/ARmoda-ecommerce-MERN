import { Suspense } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import TokenManager from "./TokenManager";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <div>
            <TokenManager />
            <Routes />
          </div>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
