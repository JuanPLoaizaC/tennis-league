'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TennisRacquet from '@public/TennisRacquet.png';
import { useAuth } from 'app/hooks/useAuth';
import Swal from 'sweetalert2';
import 'animate.css';
import Preloader from '@app/components/Preloader';
import { useRouter } from 'next/navigation';
//import GoogleLogo from '@public/Google.png';

export default function SignUp() {
  const router = useRouter();
  const auth = useAuth();
  const [user, setUser] = useState({
    name: '',
		email: '',
		password: '',
		repeatPassword: ''
	});
  const [loading, setLoading] = useState(false);

	const conditionsToClick = () => {
		return user.name === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email) || user.password < 8 || user.password !== user.repeatPassword;
	};

  const postSignUp = async () => {
    setLoading(true);
		let response = await auth.signUp(user).catch(error => {
      setLoading(false);
      let { data } = error.response;
      Swal.fire({
        icon: 'error',
        text: data.error,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
        timer: 1000
      });
    });
    if (response) {
      setLoading(false);
      router.push('/dashboard/leagues');
    }
	};

  return (
    <>
      {
        loading
        ?
        <Preloader></Preloader>
        :
        null
      }
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <Image
                src={TennisRacquet}
                className="mx-auto h-20 w-auto"
                alt=""
                width={64} 
                height={64}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to continue</h2>
            </div>
            <form>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Full name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                    value={user.name}
                    onChange={({ target}) => setUser({ ... user, name: target.value })}
                  />
                  {
                    user.name === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                    value={user.email}
                    onChange={({ target}) => setUser({ ... user, email: target.value })}
                  />
                  {
                    user.email !== "" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email) && 
                    <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>
                  }
                </div>
                <div>
                  <label htmlFor="password1" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                    Password *
                  </label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                    value={user.password}
                    onChange={({ target}) => setUser({ ... user, password: target.value })}
                  />
                  {
                    user.password.length < 8 &&
                    <p className="text-xs text-red-500 mt-1">The password must have at least 8 characters.</p>
                  }
                </div>
                <div>
                  <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                    Repeat passsword *
                  </label>
                  <input
                    name="repeatPassword"
                    type="password"
                    autoComplete="repeatPassword"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                    value={user.repeatPassword}
                    onChange={({ target}) => setUser({ ... user, repeatPassword: target.value })}
                  />
                  {
                    user.password !== user.repeatPassword &&
                    <p className="text-xs text-red-500 mt-1">Passwords must be the same.</p>
                  }
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={conditionsToClick()} onClick={postSignUp}
                >
                  Sign up
                </button>
              </div>
              {
                /*
                  <div>
                    <p className="mt-6 text-center text-gray-900">Or continue with:</p>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white outline outline-offset-2 outline-1" onClick={() => signIn()}
                    >
                      <span>
                        <Image
                          src={GoogleLogo}
                          alt=""
                          width={15} 
                          height={15}
                        />
                      </span>
                      <p style={{ fontStyle: 'normal', fontFamily: 'inherit', fontSize: 'inherit' }}>Google</p>
                    </button>
                  </div>
                */
              }
            </form>
            <div className="text-sm">
              <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                I have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
