import "./feedPage.css";
import logo from "../assets/easel-pix-logo.webp";

export default function FeedPage() {
  return (
    <main className="epLayout">
      <div className="epLeft">
        <img src={logo} alt="easel-pix-logo" className="epLogo" />
      </div>

      <div className="epRight">
        <h1 className="epTitle">Welcome to Easel-Pix</h1>
        <h2 className="epSubtitle">
          A place for you to create your own portfolio and store all your
          creative endeavours.
        </h2>
      </div>
    </main>
  );
}
