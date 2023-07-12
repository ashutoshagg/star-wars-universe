import React from "react";
import { IPlanet } from "../../types/planets.type";
import "./index.css";

type IProps = {
    planets: IPlanet[];
    handleChange: (event: any) => void;
}
const Dropdown = ({ planets, handleChange }: IProps) => {
    return (
        <div>
            <select className="container" onChange={handleChange}>
            <option value="">Select Planet</option>
                {
                    planets.map((planet: IPlanet, index: number) => {
                        return <option value={JSON.stringify(planet)} key={index}>{planet.name}</option>;
                    })
                };
            </select>
        </div>
    );
}

export default Dropdown;