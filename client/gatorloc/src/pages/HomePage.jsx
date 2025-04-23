import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { HeartCrack } from "lucide-react";

import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
	const { isLoadingUserProfiles, getUserProfiles, userProfiles, setUserProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();

	const { authUser } = useAuthStore();

	useEffect(() => {
		getUserProfiles();
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();

		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

	const handleProfileSwiped = (swipedUserId) => {
		setUserProfiles(userProfiles.filter((u) => u._id !== swipedUserId));
	};

	return (
		<div
			className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-orange-300 to-purple-300
		 overflow-hidden
		'
		>
			<Sidebar />
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
					{userProfiles.length > 0 && !isLoadingUserProfiles && (
						<>
							<SwipeArea onProfileSwiped={handleProfileSwiped}/>
							<SwipeFeedback />
						</>
					)}

					{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

					{isLoadingUserProfiles && <LoadingUI />}
				</main>
			</div>
		</div>
	);
};
export default HomePage;

const NoMoreProfiles = () => (
	<div className='flex flex-col items-center justify-center h-full text-center p-8 bg-green-100 rounded-lg shadow-xl'>
		<HeartCrack className='text-blue-500 mb-6' size={80} />
		<h2 className='text-3xl font-bold text-blue-500 mb-4'>No more profiles!</h2>
		<p className='text-xl text-blue-900 mb-6'>Come back later to try and connect with new Gatorlocators!</p>
	</div>
);

const LoadingUI = () => {
	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			<div className='card bg-green-100 w-96 h-[28rem] rounded-lg overflow-hidden border border-blue-200 shadow-xl'>
				<div className='px-4 pt-4 h-3/4'>
					<div className='w-full h-full bg-green-200 rounded-lg' />
				</div>
				<div className='card-body bg-gradient-to-b from-green-100 to-green-50 p-4'>
					<div className='space-y-2'>
						<div className='h-6 bg-blue-200 rounded w-3/4' />
						<div className='h-4 bg-blue-200 rounded w-1/2' />
					</div>
				</div>
			</div>
		</div>
	);
};
