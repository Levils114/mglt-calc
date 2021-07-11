import { GetStaticProps } from 'next';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdChevronRight } from 'react-icons/md';
import { IStarships } from '../@types/starship';
import StarshipCard from '../components/starship_card';
import calcStops from '../utils/calcStops'

interface IData{
  starships: IStarships[]
}

interface IHandleCalcStops{
  mglt: string;
}

export default function Home({ starships }: IData) {
  const { register, handleSubmit } = useForm();

  const [starshipsState, setStarshipsState] = useState<IStarships[]>(starships);
  const [validationError, setValidationError] = useState('');

  const handleCalcStops = useCallback(({ mglt }: IHandleCalcStops) => {
    setValidationError('');

    if(isNaN(Number(mglt))){
      setValidationError('Invalid number!');
    } else{
      const formatStarshipsArray = starshipsState.map(starship => {
        return {...starship, result: calcStops(starship.consumables, Number(starship.MGLT), Number(mglt))}
      }).sort((a, b) => b.result - a.result);
  
      setStarshipsState(formatStarshipsArray);
    }
  }, [starshipsState]);

  return (
    <div className="flex items-center justify-center flex-col max-w-screen-md mx-auto pt-24">
      {validationError && <span className="text-red-600 self-start mb-2 text-sm ml-4 lg:ml-0">{validationError}</span>}
      <form onSubmit={handleSubmit(handleCalcStops)} className="flex items-center justify-between w-11/12 lg:w-full shadow-2xl mb-12">
        <input 
          className="w-full py-4 pl-4 rounded-l-lg"
          placeholder="Put MGLT distance"
          {...register('mglt')}
        />
        <button type="submit" className="bg-green-400 py-4 w-16 flex items-center rounded-r-lg justify-center">
          <MdChevronRight color="#FFF" size={24} />
        </button>
      </form>

      {starshipsState.map(starship => (
        <StarshipCard key={starship.name} starship={starship}/>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async(context) => {
  const response = await fetch('https://swapi.dev/api/starships');
  const starships = await response.json();

  return {
    props: {
      starships: starships.results.map((result: IStarships) => ({ ...result, result: null }))
    }
  }
};
