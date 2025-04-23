import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-gradient-to-br
		from-orange-300 to-purple-300 p-4
	'
		>
			<div className='w-full max-w-md'>
				<h2 className='text-center text-3xl font-extrabold text-blue-500 mb-4 '>
					{isLogin ? "Sign in Gator!" : "Become a GatorLocator"}
				</h2>

				<div className='bg-green-100 shadow-xl rounded-lg p-8'>
					{isLogin ? <LoginForm /> : <SignUpForm />}

					<div className='mt-8 text-center'>
						<p className='text-sm text-blue-900'>
							{isLogin ? "New to Swipe?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
							className='mt-2 text-blue-500 hover:text-blue-200 font-medium transition-colors duration-300'
						>
							{isLogin ? "Create a new account" : "Sign in to your account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;
