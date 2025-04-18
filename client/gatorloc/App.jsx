import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { getSocket } from "./socket/socket.client";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import EventsPage from "./pages/EventsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { initializeSocket } from "./socket/socket.client";

function App() {
	const { checkAuth, authUser, checkingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// Initialize socket connection when user is authenticated
	useEffect(() => {
    if (authUser?._id) {
      console.log("Initializing socket connection for user:", authUser._id);
      initializeSocket(authUser._id);
    }
  }, [authUser]);

	if (checkingAuth) return null;

	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/auth"} />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={"/"} />} />
				<Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />} />
				<Route path='/chat/:id' element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />} />
				<Route path='/events' element={authUser ? <EventsPage /> : <Navigate to={"/auth"} />} />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
