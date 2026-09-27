import ParticleBackground from "../Particles";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="App">
      <ParticleBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;