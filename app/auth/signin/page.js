'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Preloader from '@app/components/Preloader';
import Image from 'next/image';
import TennisRacquet from '@public/TennisRacquet.png';
import Swal from 'sweetalert2';

export default function SignIn() {
  const router = useRouter();
  const auth = useAuth();
  const [user, setUser] = useState({
		email: '',
		password: '',
    rememberMe: false
	});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userSignInInfo')) {
      let userInfo = JSON.parse(localStorage.getItem('userSignInInfo'));
      if (userInfo?.rememberMe === true) {
        setUser(JSON.parse(localStorage.getItem('userSignInInfo')));
      }
    }
  }, []);

	const conditionsToClick = () => {
		return user.email === '' || user.password === '';
	};

  const postSignIn = async () => {
    setLoading(true);
		let response = await auth.signIn(user).catch(error => {
      setLoading(false);
      let { data } = error.response;
      Swal.fire({
        text: data.error,
        icon: 'error',
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
      let { data } = response;
      setLoading(false);
      fillInformationStorage(data.user);
    }
	};

  const fillInformationStorage = (userResponse) => {
    localStorage.setItem('userTennisLeague', JSON.stringify(userResponse));
    if (user.rememberMe) {
      localStorage.setItem('userSignInInfo', JSON.stringify(user));
    } else {
      localStorage.setItem('userSignInInfo', null);
    }
    if (userResponse.role === 'admin') {
      router.push('/management/createTournament');
    } else {
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={user.email}
                    onChange={({ target }) => setUser({... user, email: target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={user.password}
                    onChange={({ target }) => setUser({... user, password: target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" checked={user.rememberMe} onChange={({ target }) => setUser({ ... user, rememberMe: target.checked })} />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                {/*
                  <div className="text-sm">
                  <a href="/reset" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
                */}
              </div>
              <div>
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={conditionsToClick()} onClick={postSignIn}
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-sm">
              <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
