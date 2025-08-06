export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-colour fixed-top">
      <div className="container-fluid text-md-start text-center fs-5">
        <a className="navbar-brand" href="/">
          <img
            src="./orderit.svg"
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          Orderit
        </a>
      </div>
    </nav>
  );
}
