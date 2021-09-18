import axios from "axios";

export async function storeToken(dispatch) {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    dispatch({ type: "SET_JWT", payload: token });
    const response = await axios.get("/auth/user", {
      headers: { jwt: 'Bearer ${token}' },
    });
    dispatch({ type: "SET_USER", payload: response.data });
  } catch (err) {
    alert(err.response.data.msg)
  }
}