'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useManageTournament } from '@app/hooks/useManageTournament';
import Preloader from '@app/components/Preloader';
import TennisTrophy from '@public/TennisTrophy.jpg';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function ManageTournaments() {
  const router = useRouter();
  const manageTournament = useManageTournament();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('first')
    getService();
  }, []);

  const getService = async () => {
    setLoading(true);
    let response = await manageTournament.getTournaments().catch(error => {
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
      console.log(response.data);
      let { data: { tournaments } } = response
      setTournaments(tournaments);
      setLoading(false);
    }
  };

  const redirectToEdit = (tournament) => {
    manageTournament.setTournamentToEdit(tournament);
    console.log(tournament);
    router.push('/management/editTournament');
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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {tournaments?.map((tournament) => (
              <div key={tournament.id} className="group relative" onClick={() => redirectToEdit(tournament)}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={TennisTrophy}
                  alt={tournament.id}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="mt-1 text-sm text-gray-500">{tournament.location}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{tournament.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}