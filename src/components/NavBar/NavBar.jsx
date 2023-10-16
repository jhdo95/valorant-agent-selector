import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <span className="navbar__user">Welcome Agent, {user.name}</span>
      <div className="navbar__links">
        <Link to="/quiz" className="navbar__link">Valorant Agent Selector Quiz</Link>
        <Link to="/agents" className="navbar__link">All Agents</Link>
        <button onClick={handleLogOut} className="navbar__logout-btn">Log Out</button>
      </div>
    </nav>
  );
}