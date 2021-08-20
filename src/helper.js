import axios from "axios";

export async function storeToken(dispatch) {

    const token = localStorage.getItem("jwt");
    if (!token) return;
    dispatch({ type: "SET_JWT", payload: token });
    const response = await axios.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "SET_USER", payload: response.data });
}