'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useManageTournament } from '@app/hooks/useManageTournament';
import TennisRacquet from '@public/TennisRacquet.png';
import Preloader from '@app/components/Preloader';
import Image from 'next/image';

function EditTournament() {
  const router = useRouter();
  const manageTournament = useManageTournament();
  const [tournament, setTournament] = useState({
    name: '',
    location: '',
    price: 0,
    startDate: '',
    endDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const conditionsToClick = () => {
		return tournament.name === '' || tournament.location === '' || tournament.startDate === '' || tournament.endDate === '' || tournament.startDate > tournament.endDate === '' || tournament.description === '' || tournament.description.length > 300;
	};

  const postCrateTournament = async () => {
    setLoading(true);
		let response = await manageTournament.CreateTournament(tournament).catch(error => {
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
      Swal.fire({
        icon: 'success',
        text: 'Created succesfully',
        showDenyButton: true,
        confirmButtonText: 'See all tournaments',
        denyButtonText: 'Create another',
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
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/management/manageTournaments');
        } else if (result.isDenied) {
          cleanData();
      }});
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
      <div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <Image
            src={TennisRacquet}
            className="mx-auto h-20 w-auto"
            alt=""
            width={64}
            height={64}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Edit tournament
          </h2>
        </div>
        <form className="mt-8 mb-8 space-y-6" onSubmit={(e) => e.preventDefault()} >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Name *
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={tournament.name}
                        onChange={({ target }) => setTournament({ ... tournament, name: target.value })}
                      />
                    </div>
                  </div>
                  {
                    tournament.name === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Location *
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="location"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={tournament.location}
                        onChange={({ target }) => setTournament({ ... tournament, location: target.value })}
                      />
                    </div>
                  </div>
                  {
                    tournament.location === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Price *
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        min={0}
                        name="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={tournament.price}
                        onChange={({ target }) => setTournament({ ... tournament, price: target.value })}
                      />
                    </div>
                  </div>
                  {
                    tournament.price === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Start date *
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="date"
                        name="startDate"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={tournament.startDate}
                        onChange={({ target }) => setTournament({ ... tournament, startDate: target.value })}
                      />
                    </div>
                  </div>
                  {
                    tournament.startDate === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                  {
                    (tournament.startDate && tournament.endDate) && (tournament.startDate > tournament.endDate) && 
                    <p className="text-xs text-red-500 mt-1">The end date must be bigger than the initial date.</p>
                  }
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  End date *
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="date"
                        name="endDate"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={tournament.endDate}
                        onChange={({ target }) => setTournament({ ... tournament, endDate: target.value })}
                      />
                    </div>
                  </div>
                  {
                    tournament.endDate === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                  {
                    (tournament.startDate && tournament.endDate) && (tournament.startDate > tournament.endDate) && 
                    <p className="text-xs text-red-500 mt-1">The end date must be bigger than the initial date</p>
                  }
                </div>
                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Description *
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={tournament.description}
                      onChange={({ target }) => setTournament({ ... tournament, description: target.value })}
                    />
                  </div>
                  {
                    tournament.description === '' && 
                    <p className="text-xs text-red-500 mt-1">Required field.</p>
                  }
                  {
                    tournament.description.length > 300 && 
                    <p className="text-xs text-red-500 mt-1">Maximum 300 characters.</p>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={conditionsToClick()} onClick={postCrateTournament}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTournament;
