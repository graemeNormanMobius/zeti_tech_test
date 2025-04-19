import {
    BrowserRouter as Router,
    Routes,
    Route
    // Link
    // useParams
} from 'react-router-dom';
import { Post } from './Post';
import { Dashboard } from "./routes/dashboard.tsx";
import { MainMenu } from "./components/mainMenu.tsx";
import { Billing } from "./routes/billing.tsx";
import { AddToFleet } from "./routes/addToFleet.tsx";
import { YourFleet } from "./routes/yourFleet.tsx";

function App() {
    return (
        <Router>
            <div className="wrapper navbarFullWidthContainer">

                <div className="header">
                    <div className="header-fullWidthOpacity">&nbsp;</div>
                    <div className="component-section first">
                        <span className="bodyMedEmp">Bob's Taxis by Zeti</span>
                    </div>
                    <div className="component-section last">
                        <div className="topBarMenuItems">
                            <span className="menuItem">{/*<Watchlist />*/}</span>
                            <span className="menuItem">
                              {/*<AccountMenu />*/}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mainNav">
                    <MainMenu />
                </div>
                <div className="outer-container">
                    <div className="contentArea">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/yourFleet" element={<YourFleet />} />
                            <Route path="/addVehicle" element={<AddToFleet />} />
                            <Route path="/billingHistory" element={<Billing />} />
                            <Route path="/post/:id" element={<Post id={1} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App
