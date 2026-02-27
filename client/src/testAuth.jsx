import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logout } from "./features/auth/authSlice";

const TestAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            loginThunk({
              email: "iqbal@test.com",
              password: "password",
            }),
          )
        }
      >
        Test Login
      </button>

      <button onClick={() => dispatch(logout())}>Logout</button>

      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};

export default TestAuth;
