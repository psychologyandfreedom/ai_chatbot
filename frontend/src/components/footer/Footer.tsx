import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p
          style={{
            fontSize: "30px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Built by
          <span>
            <Link 
                style={{ color: "white" }} 
                className="nav-link" 
                to={"https://dev-puce-one.vercel.app/"}>
              Matthew Norman ⌨️
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
