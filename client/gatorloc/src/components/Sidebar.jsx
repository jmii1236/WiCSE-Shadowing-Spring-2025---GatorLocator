import { useEffect, useState, useRef } from "react";
import { Speech, Loader, MessageCircle, X, Users, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

function useOutsideClick(callback) {
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [callback]);

	return ref;
}

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const sidebarRef = useOutsideClick(() => {
		if (isOpen) setIsOpen(false);
	});

	const toggleSidebar = () => setIsOpen(!isOpen);

	const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

	useEffect(() => {
		getMyMatches();
	}, [getMyMatches]);

	// Add navigation links
	const navLinks = [
		{ to: "/", icon: <Users size={24} />, label: "Matches" },
		{ to: "/events", icon: <Calendar size={24} />, label: "Events" }
	];

	// Check if current path is active
	const isActive = (path) => location.pathname === path || 
		(path === "/" && location.pathname.startsWith("/chat"));

	return (
		<>
			<div
				ref={sidebarRef}
				className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-purple-100 shadow-2xl rounded-r-2xl backdrop-blur-sm
        overflow-hidden transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:w-1/4
				rounded-tr-none rounded-br-xl
      `}
			>
				<div className='flex flex-col h-full'>
					{/* Navigation Links */}
					<div className='p-4 border-b border-blue-200'>
						<div className='flex items-center justify-between mb-4'>
							<button
								className='lg:hidden p-1 text-blue-500 hover:text-blue-700 transition'
								onClick={toggleSidebar}
							>
								<X size={22} />
							</button>
						</div>
						
						<div className='flex flex-col gap-2 mt-2'>
							{navLinks.map(link => (
								<Link 
									key={link.to} 
									to={link.to}
									className={`flex items-center gap-3 p-2 rounded-lg transition duration-200 
										${isActive(link.to) 
											? 'bg-blue-200 text-blue-700' 
											: 'hover:bg-green-200 text-blue-600'}`}
								>
									{link.icon}
									<span className='font-medium'>{link.label}</span>
								</Link>
							))}
						</div>
					</div>

					{/* Match List Section */}
					<div className='p-4 pb-2 border-b border-blue-200 flex items-center gap-2'>
						<Users className='text-blue-500' size={20} />
						<h2 className='text-lg font-bold text-blue-600'>My Matches</h2>
					</div>

					{/* Match List */}
					<div className='flex-grow overflow-y-auto p-4 space-y-4 relative z-10'>
						{isLoadingMyMatches ? (
							<LoadingState />
						) : matches.length === 0 ? (
							<NoMatchesFound />
						) : (
							matches.map((match) => (
								<Link key={match._id} to={`/chat/${match._id}`}>
									<div className='flex items-center gap-3 p-2 rounded-lg hover:bg-green-200 transition duration-200 cursor-pointer'>
										<img
											src={match.image || "/avatar.png"}
											alt='User avatar'
											className='w-12 h-12 object-cover rounded-full border-2 border-blue-300'
										/>
										<h3 className='font-semibold text-blue-700'>{match.name}</h3>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>

			{/* Mobile toggle button */}
			{/* Mobile toggle button */}
			{!isOpen && (
  <button
    className='lg:hidden fixed top-[108px] left-3 p-2 bg-blue-500 text-white rounded-full shadow-md z-20'
    onClick={toggleSidebar}
  >
    <MessageCircle size={24} />
  </button>
)}
		</>
	);
};

export default Sidebar;

const NoMatchesFound = () => (
	<div className='flex flex-col items-center justify-center h-full text-center px-4'>
		<Speech className='text-blue-400 mb-4' size={48} />
		<h3 className='text-lg font-semibold text-blue-700 mb-2'>No matches...yet!</h3>
		<p className='text-blue-600 text-sm max-w-xs'>
			Don&apos;t worry! Your first match could be the next swipe...keep connecting!
		</p>
	</div>
);

const LoadingState = () => (
	<div className='flex flex-col items-center justify-center h-full text-center px-4'>
		<Loader className='text-blue-500 mb-4 animate-spin' size={48} />
		<h3 className='text-lg font-semibold text-blue-700 mb-2'>Loading Matches</h3>
		<p className='text-blue-600 text-sm max-w-xs'>
			We&apos;re finding your perfect matches. This might take a moment...
		</p>
	</div>
);
