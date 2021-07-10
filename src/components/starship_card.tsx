import { IStarships } from "../@types/starship";

interface IData{
    starship: IStarships;
}

export default function StarshipCard({ starship }: IData){
    return(
        <div key={starship.name} className="flex items-start justify-between flex-col lg:flex-row w-11/12 lg:w-full mb-12 shadow-2xl rounded-xl p-6 bg-white">
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <h4 className="text-xl">Name: {starship.name}</h4>
            <p>Model: {starship.model}</p>
            <p>Cost in credits: {starship.cost_in_credits}</p>
          </div>

          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <h4>Consumables: {starship.consumables}</h4>
            <p>MGLT: {starship.MGLT}</p>
            <p>Lenght: {starship.lenght}</p>
          </div>

          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <h4>Starship Class: {starship.starship_class}</h4>
            {starship.result !== null ? <h2 className="text-xl">Stops: {starship.result}</h2> : <></>}
          </div>
        </div>
    );
}