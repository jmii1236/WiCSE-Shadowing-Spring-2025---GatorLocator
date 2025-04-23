import { useEffect, useRef, useState } from "react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Star, User, LogOut, Menu } from "lucide-react";
import GatorIcon from '../components/GatorIcon';


export const Header = () => {
	const { authUser, logout } = useAuthStore();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className='bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 shadow-md rounded-b-xl'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					{/* Brand */}
					<Link to='/' className='flex items-center space-x-2'>
					<GatorIcon color="#2563eb" size={36} />
						<span className='text-2xl font-bold text-blue-700 hidden sm:inline'>GatorLocator</span>
					</Link>

					{/* Desktop Menu */}
					<div className='hidden md:flex items-center space-x-6'>
						{authUser ? (
							<div className='relative' ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className='flex items-center gap-3 hover:bg-blue-100 px-3 py-2 rounded-xl transition'
								>
									<img
										src={authUser.image || "avatar.png"}
										alt='User'
										className='h-10 w-10 object-cover rounded-full border-2 border-blue-500'
									/>
									<span className='text-blue-800 font-medium'>{authUser.name}</span>
								</button>

								{dropdownOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-xl z-20 overflow-hidden'>
										<Link
											to='/profile'
											className='flex items-center px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 transition'
											onClick={() => setDropdownOpen(false)}
										>
											<User className='mr-2' size={16} />
											Profile
										</Link>
										<button
											onClick={logout}
											className='flex items-center w-full text-left px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 transition'
										>
											<LogOut className='mr-2' size={16} />
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to='/auth'
									className='text-blue-700 hover:text-blue-500 transition font-medium'
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium border border-blue-300 hover:bg-blue-200 transition'
								>
									Sign Up
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-blue-600 focus:outline-none'
						>
							<Menu className='size-6' />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className='md:hidden bg-white shadow-inner border-t border-blue-100 rounded-b-xl px-4 py-4 space-y-3'>
					{authUser ? (
						<>
							<Link
								to='/profile'
								onClick={() => setMobileMenuOpen(false)}
								className='block text-blue-700 font-medium hover:bg-blue-100 px-3 py-2 rounded-lg'
							>
								Profile
							</Link>
							<button
								onClick={() => {
									logout();
									setMobileMenuOpen(false);
								}}
								className='w-full text-left text-blue-700 font-medium hover:bg-blue-100 px-3 py-2 rounded-lg'
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								to='/auth'
								onClick={() => setMobileMenuOpen(false)}
								className='block text-blue-700 font-medium hover:bg-blue-100 px-3 py-2 rounded-lg'
							>
								Login
							</Link>
							<Link
								to='/auth'
								onClick={() => setMobileMenuOpen(false)}
								className='block text-blue-700 font-medium hover:bg-blue-100 px-3 py-2 rounded-lg'
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			)}
		</header>
	);
};
