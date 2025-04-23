import React from 'react'
import { useState } from "react" 
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {


	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [year, setYear] = useState("");
  const [interests, setInterests] = useState([]);
	const [interestsPreference, setInterestsPreference] = useState([]);

	const { signup, loading } = useAuthStore();

	const handleInterestsChange = (interest) => {
		setInterests((prev) =>
			prev.includes(interest)
				? prev.filter((item) => item !== interest)
				: [...prev, interest]
		);
	};
	const handleInterestsPreferenceChange = (interestpreference) => {
		setInterestsPreference((prev) =>
			prev.includes(interestpreference)
				? prev.filter((item) => item !== interestpreference)
				: [...prev, interestpreference]
		);
	};
	
		return (
		<form
			className='space-y-6'
			onSubmit={(e) => {
				e.preventDefault();
				signup({ name, email, password, gender, year, interests, interestsPreference });
			}}
		>
			{/* NAME */}
			<div>
				<label htmlFor='name' className='block text-sm font-medium text-blue-500'>
					Name
				</label>
				<div className='mt-1'>
					<input
						id='name'
						name='name'
						type='text'
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* EMAIL */}
			<div>
				<label htmlFor='email' className='block text-sm font-medium text-blue-500'>
					Email address
				</label>
				<div className='mt-1'>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* PASSWORD */}
			<div>
				<label htmlFor='password' className='block text-sm font-medium text-blue-500'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='new-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* YEAR */}
			<div>
				<label className='block text-sm font-medium text-blue-500'>Your Year</label>
				<div className='mt-2 flex gap-2'>
					<div className='flex items-center'>
						<input
							id='1st'
							name='year'
							type='checkbox'
							checked={year === "1st"}
							onChange={() => setYear("1st")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='1st' className='ml-2 block text-sm text-blue-700'>
							1st
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='2nd'
							name='year'
							type='checkbox'
							checked={year === "2nd"}
							onChange={() => setYear("2nd")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='2nd' className='ml-2 block text-sm text-blue-700'>
							2nd
						</label>
					</div>
          <div className='flex items-center'>
						<input
							id='3rd'
							name='year'
							type='checkbox'
							checked={year === "3rd"}
							onChange={() => setYear("3rd")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='3rd' className='ml-2 block text-sm text-blue-700'>
							3rd
						</label>
					</div>
          <div className='flex items-center'>
						<input
							id='4th'
							name='year'
							type='checkbox'
							checked={year === "4th"}
							onChange={() => setYear("4th")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='4th' className='ml-2 block text-sm text-blue-700'>
							4th
						</label>
					</div>
          <div className='flex items-center'>
						<input
							id='5th+'
							name='year'
							type='checkbox'
							checked={year === "5th+"}
							onChange={() => setYear("5th+")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='5th+' className='ml-2 block text-sm text-blue-700'>
							5th+
						</label>
					</div>
				</div>
			</div>
			{/* GENDER */}
			<div>
				<label className='block text-sm font-medium text-blue-500'>Your Gender</label>
				<div className='mt-2 flex gap-2'>
					<div className='flex items-center'>
						<input
							id='male'
							name='gender'
							type='checkbox'
							checked={gender === "male"}
							onChange={() => setGender("male")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='male' className='ml-2 block text-sm text-blue-700'>
							Male
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='female'
							name='gender'
							type='checkbox'
							checked={gender === "female"}
							onChange={() => setGender("female")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='female' className='ml-2 block text-sm text-blue-700'>
							Female
						</label>
					</div>
          <div className='flex items-center'>
						<input
							id='nonbinary'
							name='gender'
							type='checkbox'
							checked={gender === "nonbinary"}
							onChange={() => setGender("nonbinary")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='nonbinary' className='ml-2 block text-sm text-blue-700'>
							Nonbinary
						</label>
					</div>
          <div className='flex items-center'>
						<input
							id='other'
							name='gender'
							type='checkbox'
							checked={gender === "other"}
							onChange={() => setGender("other")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='other' className='ml-2 block text-sm text-blue-700'>
							Other
						</label>
					</div>
				</div>
			</div>

			{/* INTERESTS */}
			<div>
				<label className='block text-sm font-medium text-blue-500'>Your Interests</label>
				<div className='mt-2 flex gap-2 flex-wrap'>
					{["movies", "live music", "working out", "books", "hiking"].map((interest) => (
						<div key={interest} className='flex items-center'>
							<input
								id={interest}
								name='interests'
								type='checkbox'
								checked={interests.includes(interest)}
								onChange={() => handleInterestsChange(interest)}
								className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
							/>
							<label htmlFor={interest} className='ml-2 block text-sm text-blue-700'>
								{interest.charAt(0).toUpperCase() + interest.slice(1)}
							</label>
						</div>
					))}
				</div>
			</div>
			{/* INTERESTS PREFERENCE*/}
			<div>
				<label className='block text-sm font-medium text-blue-500'>Your Interests For Friends</label>
				<div className='mt-2 flex gap-2 flex-wrap'>
					{["movies", "live music", "working out", "books", "hiking"].map((interestpreference) => (
						<div key={interestpreference} className='flex items-center'>
							<input
								id={interestpreference}
								name='interestsPreference'
								type='checkbox'
								checked={interestsPreference.includes(interestpreference)}
								onChange={() => handleInterestsPreferenceChange(interestpreference)}
								className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
							/>
							<label htmlFor={interestpreference} className='ml-2 block text-sm text-blue-700'>
								{interestpreference.charAt(0).toUpperCase() + interestpreference.slice(1)}
							</label>
						</div>
					))}
				</div>
			</div>
			<div>
				<button
					type='submit'
					className="w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-400"
          disabled={loading}
				>
					{loading ? "Signing up..." : "Sign up"}
				</button>
			</div>
		</form>
	);
};
export default SignUpForm;



  
