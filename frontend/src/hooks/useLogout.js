import { useDispatch } from "react-redux";
import useShowToast from "./useShowToast";
import { userLogout } from "../state/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const showToast = useShowToast();
    const dispatch=useDispatch();
	const navigate=useNavigate()

	const logout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			dispatch(userLogout());
			navigate("/auth");
        } catch (error) {
			showToast("Error", error, "error");
		}
	};

	return logout;
};

export default useLogout;