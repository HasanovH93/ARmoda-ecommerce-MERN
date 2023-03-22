import { Suspense } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

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
          <Routes />
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
