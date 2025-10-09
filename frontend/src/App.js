import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Ứng dụng Authentication</h1>
      <Signup />
      <hr />
      <Login />
    </div>
  );
}

export default App;