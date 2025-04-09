import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";
import styles from './NavBar.module.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (

    <nav className={styles.container}>

      {user ? (
        <ul>
          <li>APP NAME</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/alarms">Your Alarms</Link>
          </li>
          <li>
            <Link to="alarms/new">Create a new Alarm</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <div className={styles.left}>
          <li>
            <Link to="/">Home</Link>
          </li>
          </div>
            <div className={styles.right}>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
            </div>
        </ul>
      )}
    </nav>
    <div>
      <button className='themeBtn'>Change Theme</button>
    </div>
    </>
  );
};

export default NavBar;
