const Nav = ({
  minimal, authToken, setShowModal, showModal, setIsSignUp}) => {

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
      </div>
      {!authToken && !minimal &&
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}>
          Log In
        </button>}
    </nav>
  );
};
export default Nav;