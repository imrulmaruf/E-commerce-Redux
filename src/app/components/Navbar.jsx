import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../../features/cart/selectors";

export default function Navbar() {
  const count = useSelector(selectTotalItems);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({count})</Link>
    </nav>
  );
}
