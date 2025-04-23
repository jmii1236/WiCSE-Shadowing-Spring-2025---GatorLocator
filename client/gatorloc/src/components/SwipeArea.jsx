import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";

const SwipeArea = () => {
	const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

	const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};

	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			{userProfiles.map((user) => (
				<TinderCard
					className='absolute shadow-none'
					key={user._id}
					onSwipe={(dir) => handleSwipe(dir, user)}
					swipeRequirementType='position'
					swipeThreshold={100}
					preventSwipe={["up", "down"]}
				>
					<div
						className='card bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 w-96 h-[28rem] select-none rounded-lg overflow-hidden border
					 border-blue-200 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105'
					>
						<figure className='px-4 pt-4 h-3/4'>
							<img
								src={user.image || "/avatar.png"}
								alt={user.name}
								className='rounded-lg object-cover h-full pointer-events-none boarder'
							/>
						</figure>
						<div className='card-body from-green-100 via-blue-50 to-blue-100'>
							<h2 className='card-title text-2xl text-blue-500'>
								{user.name}, {user.year} year
							</h2>
							<p className='text-blue-900'>Looking for: {user.interestsPreference.join(' | ')}</p>
							<p className='text-blue-900'>Interests: {user.interests.join(' | ')}</p>
						</div>
					</div>
				</TinderCard>
			))}
		</div>
	);
};

export default SwipeArea;
