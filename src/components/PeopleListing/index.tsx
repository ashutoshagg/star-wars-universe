import React from 'react';
import { IResident } from '../../types/resident.type';
import './index.css';

type IProps = {
    residents: IResident[];
    planet: string;
}
const PeopleListing = ({ residents, planet }: IProps) => {
    return (
        <>
            <h3>
                People from {planet} planet
            </h3>
            <div className="sub-container">
                {residents &&
                    residents.map((item: IResident, index: number) => (
                        <React.Fragment key={index}>
                            <label>{item.name}</label>
                        </React.Fragment>
                    ))}
            </div>
        </>
    );
}

export default PeopleListing;