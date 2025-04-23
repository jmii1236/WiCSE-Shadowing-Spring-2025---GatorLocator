import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
	const { authUser } = useAuthStore();
	const [name, setName] = useState(authUser?.name || "");
	const [bio, setBio] = useState(authUser?.bio || "");
	const [year, setYear] = useState(authUser?.year || "");
	const [gender, setGender] = useState(authUser?.gender || "");
	const [interests, setInterests] = useState(authUser?.interests || []);
	const [interestsPreference, setInterestsPreference] = useState(authUser?.interestsPreference || []);
	const [image, setImage] = useState(authUser?.image || null);

	const fileInputRef = useRef(null);

	const { loading, updateProfile } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile({ name, bio, year, gender, interests, interestsPreference, image });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	console.log(image);

	return (
		<div className='min-h-screen bg-gradient-to-br from-orange-300 to-purple-300 flex flex-col'>
			<Header />

			<div className='flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-blue-500'>Your Profile</h2>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-green-100 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-blue-200'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* NAME */}
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-blue-700'>
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
										className='appearance-none block w-full px-3 py-2 border border-blue-300
										 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
										sm:text-sm'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
											className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
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
									{["movies", "live music", "working out", "books", "hiking"].map((interestsPreference) => (
										<div key={interestsPreference} className='flex items-center'>
											<input
												id={interestsPreference}
												name='interests'
												type='checkbox'
												checked={interests.includes(interestsPreference)}
												onChange={() => {
													if (interests.includes(interestsPreference)) { // Fixed: using interestsPreference instead of interest
															setInterests(interests.filter(i => i !== interestsPreference));
													} else {
															setInterests([...interests, interestsPreference]);
													}
											}}
												className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
											/>
											<label htmlFor={interestsPreference} className='ml-2 block trext-sm text-blue-700'>
												{interestsPreference.charAt(0).toUpperCase() + interestsPreference.slice(1)}
											</label>
										</div>
									))}
								</div>
							</div>
							{/* INTEREST PREFERENCES */}
							<div>
								<label className='block text-sm font-medium text-blue-500'>Interests You'd Like to Find in Others</label>
								<div className='mt-2 flex gap-2 flex-wrap'>
									{["movies", "live music", "working out", "books", "hiking"].map((interest) => (
										<div key={`pref-${interest}`} className='flex items-center'>
											<input
												id={`pref-${interest}`}
												name='interestsPreference'
												type='checkbox'
												checked={interestsPreference.includes(interest)}
												onChange={() => {
													if (interestsPreference.includes(interest)) {
														setInterestsPreference(interestsPreference.filter(i => i !== interest));
													} else {
														setInterestsPreference([...interestsPreference, interest]);
													}
												}}
												className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded'
											/>
											<label htmlFor={`pref-${interest}`} className='ml-2 block text-sm text-blue-700'>
												{interest.charAt(0).toUpperCase() + interest.slice(1)}
											</label>
										</div>
									))}
								</div>
							</div>
							{/* BIO */}

							<div>
								<label htmlFor='bio' className='block text-sm font-medium text-blue-700'>
									Bio
								</label>
								<div className='mt-1'>
									<textarea
										id='bio'
										name='bio'
										rows={3}
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-blue-700'>Cover Image</label>
								<div className='mt-1 flex items-center'>
									<button
										type='button'
										onClick={() => fileInputRef.current.click()}
										className='inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
									>
										Upload Image
									</button>
									<input
										ref={fileInputRef}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleImageChange}
									/>
								</div>
							</div>

							{image && (
								<div className='mt-4'>
									<img src={image} alt='User Image' className='w-48 h-full object-cover rounded-md' />
								</div>
							)}

							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
								focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
								disabled={loading}
							>
								{loading ? "Saving..." : "Save"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
