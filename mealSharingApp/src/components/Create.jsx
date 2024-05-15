import { Link } from "react-router-dom/cjs/react-router-dom";
export default function Create() {
  return (
    <div>
      <h1>You can add the meal that you wish to share it!</h1>
      <Link to={"/meals"}>
        <button>View All Meals</button>
      </Link>
    </div>
  );
}
