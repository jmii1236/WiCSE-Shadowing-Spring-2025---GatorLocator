import { useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX, Film, Music, Dumbbell, Book, Mountain } from "lucide-react";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
	const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
	const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
	const { authUser } = useAuthStore();

	const { id } = useParams();

	const match = matches.find((m) => m?._id === id);

	useEffect(() => {
		if (authUser && id) {
			getMyMatches();
			getMessages(id);
			subscribeToMessages();
		}

		return () => {
			unsubscribeFromMessages();
		};
	}, [getMyMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);

	// Function to find overlapping interests between users - simplified for reliable operation
	const getOverlappingInterests = () => {
		// Ensure both users have movie interests by default if data is missing
		// This is a temporary fix until the data structure is corrected
		return ["movies"]; // Hard-coded solution for now
	};

	// Function to suggest activities based on common interests
	const suggestActivity = () => {
		// Always suggest movies as a fallback activity
		return "How about watching the latest movie at the campus theater this weekend?";
	};

	// Function to get an appropriate icon based on suggested activity
	const getSuggestionIcon = () => {
		// Always use Film icon since we're defaulting to movies
		return Film;
	};

	if (isLoadingMyMatches) return <LoadingMessagesUI />;
	if (!match) return <MatchNotFound />;

	const SuggestionIcon = getSuggestionIcon();

	return (
		<div className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-orange-300 to-purple-300 overflow-hidden'>
			<div className='flex-grow flex flex-col overflow-hidden'>
				<Header />
				<main className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
					<div className='flex items-center mb-4 bg-green-100 rounded-lg shadow-xl p-3'>
						<img
							src={match.image || "/avatar.png"}
							className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-blue-300'
							alt={match.name || "User"}
						/>
						<h2 className='text-xl font-semibold text-blue-800'>{match.name}</h2>
					</div>

					<div className='flex-grow overflow-y-auto mb-4 bg-green-100 rounded-lg shadow-xl p-4'>
						{messages.length === 0 ? (
							<div className='text-center py-8'>
								<p className='text-blue-500 mb-4'>Start your conversation with {match.name}</p>
								
								<div className='bg-blue-50 p-4 rounded-lg max-w-md mx-auto shadow'>
									<div className='flex items-center mb-2'>
										<SuggestionIcon size={20} className='text-blue-500 mr-2' />
										<h3 className='font-medium text-blue-700'>Activity Suggestion</h3>
									</div>
									<p className='text-blue-600'>{suggestActivity()}</p>
									<div className='mt-3 flex flex-wrap gap-2'>
										<span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs'>
											movies
										</span>
									</div>
								</div>
							</div>
						) : (
							messages.map((msg) => (
								<div
									key={msg._id}
									className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
								>
									<span
										className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
											msg.sender === authUser._id
												? "bg-blue-500 text-white"
												: "bg-green-200 text-blue-800"
										}`}
									>
										{msg.content}
									</span>
								</div>
							))
						)}
					</div>
					<div className="bg-green-100 rounded-lg shadow-xl p-4">
						<MessageInput match={match} />
					</div>
				</main>
			</div>
		</div>
	);
};
export default ChatPage;

const MatchNotFound = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-300 to-purple-300 overflow-hidden'>
		<div className='bg-green-100 p-8 rounded-lg shadow-xl text-center'>
			<UserX size={64} className='mx-auto text-blue-500 mb-4' />
			<h2 className='text-2xl font-semibold text-blue-800 mb-2'>Match Not Found</h2>
			<p className='text-blue-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
			<Link
				to='/'
				className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-blue-300 inline-block'
			>
				Go Back To Home
			</Link>
		</div>
	</div>
);

const LoadingMessagesUI = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-300 to-purple-300 overflow-hidden'>
		<div className='bg-green-100 p-8 rounded-lg shadow-xl text-center'>
			<Loader size={48} className='mx-auto text-blue-500 animate-spin mb-4' />
			<h2 className='text-2xl font-semibold text-blue-800 mb-2'>Loading Chat</h2>
			<p className='text-blue-600'>Please wait while we fetch your conversation...</p>
			<div className='mt-6 flex justify-center space-x-2'>
				<div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
				<div
					className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	</div>
);
