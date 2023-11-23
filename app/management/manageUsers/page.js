'use client';

import Preloader from '@app/components/Preloader';
import { useManageUsers } from '@app/hooks/useManageUsers';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
  
export default function Example() {
  const manageUsers = useManageUsers();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    setLoading(true);
    let response = await manageUsers.getUsers().catch(error => {
      console.log(error);
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
      let { data: { users } } = response;
      console.log(response.data);
      setUsers(users);
      setLoading(false);
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
      <div className="bg-white flex flex-col ml-5">
        <div>
          <ul role="list" className="divide-y divide-gray-100">
            {users?.map((person) => (
              <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-8">
                  <p className="text-sm leading-6 text-gray-900">{person.role === 'admin' ? 'Admin' : 'User'}</p>
                </div>
                {
                  person.role !== 'admin'
                  ?
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={conditionsToClick()} onClick={putUpdateTournament}
                    >
                      Upgrade to adminx
                    </button>
                  </div>
                  :
                  null
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
};
  