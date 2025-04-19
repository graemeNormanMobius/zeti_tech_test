import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "./layout.tsx";

export default function App() {

    return (
        <Router>
            <Layout />
        </Router>
    );
}
