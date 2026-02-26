import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.auth);
  console.log("auth state:", auth);
  return <div>App</div>;
};

export default App;

