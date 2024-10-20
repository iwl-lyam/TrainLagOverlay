import { Routes, Route, Outlet, Link } from "react-router-dom";
import Admin from "./Pages/Admin.tsx";
import Runner from "./Pages/Runner.tsx";
import Chaser from "./Pages/Chaser.tsx";

export default function App() {
    return (
        <div className="m-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/chaser" element={<Chaser />} />
                <Route path="/runner" element={<Runner />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
    );
}

function Layout() {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            <p>I am a:</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/chaser">Chaser</Link>
                    </li>
                    <li>
                        <Link to="/runner">Runner</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin (not operational)</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}