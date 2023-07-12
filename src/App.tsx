import React, { useEffect, useState } from 'react';
import './App.css';
import { getPlanetsApi } from './api/planets.api';
import { IPlanet, IPlanetResponse } from './types/planets.type';
import LoadingSpinner from './components/LoadingSpinner';
import Dropdown from './components/Dropdown';
import { IResident } from './types/resident.type';
import PaginatedItems from './components/Pagination';
import PeopleListing from './components/PeopleListing';

function App() {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [residents, setResidents] = useState<IResident[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [planet, setPlanet] = useState<any>({});

  useEffect(() => {
    getPlanetsData();
  }, []);

  const getPlanetsData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const planets = await getAllPlanets();
      setPlanets(planets);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage('This is some issue with the server. Please try after sometime');
    } finally {
      setIsLoading(false);
    }
  };

  const getAllPlanets = async (url: string = '', planets: IPlanet[] = []): Promise<any> => {
    const response = await getPlanetsApi(url);
    const { results, next }: IPlanetResponse = response.data;
    planets = [...planets, ...results];
    if (next !== null) {
      return getAllPlanets(next, planets);
    }
    return planets;
  }

  const handleChange = async (event: any) => {
    if (event && event.target.value) {
      setResidents([]);
      const planet = JSON.parse(event.target.value);
      console.log('handleChange -->>', planet);
      setPlanet(planet);
    }
  }

  const saveResidents = (residents: IResident[] = []) => {
    setResidents(residents);
  }

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      {
        !isLoading && errorMessage === '' && (
          <>
            <h1 className="text-center">Welcome to the Star Wars Universe</h1>
            <label>Please select planet</label>
            <Dropdown
              planets={planets}
              handleChange={handleChange}
            />
          </>
        )
      }
      {
        errorMessage && (
          <h2>{errorMessage}</h2>
        )
      }

      {
        residents.length > 0 && (
          <PeopleListing
            residents={residents}
            planet={planet.name}
          />
        )
      }
      {
        planet && planet.residents && planet.residents.length > 0 && (
          <PaginatedItems
            itemsPerPage={3}
            planet={planet}
            saveResidents={saveResidents}
          />
        )
      }
      {
        planet && planet.residents && planet.residents.length === 0 && (
          <h3>There is no resident on {planet.name}</h3>
        )
      }
    </div>
  );
}

export default App;
