import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { getPeopleApi } from '../../api/people.api';
import { IPlanet } from '../../types/planets.type';
import { IResident } from '../../types/resident.type';
import './index.css';

type IProps = {
    itemsPerPage: number;
    saveResidents: (residents: IResident[]) => void;
    planet: IPlanet;
}

const PaginatedItems = ({
    itemsPerPage,
    saveResidents,
    planet,
}: IProps) => {
    let itemOffset = 0;
    let endOffset = itemOffset + itemsPerPage;
    let currentResidents: any[] = planet.residents.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(planet.residents.length / itemsPerPage);

    useEffect(() => {
        console.log('pagination')
        callPeopleApi();
    }, []);

    useEffect(() => {
        console.log('useEffect change')
        callPeopleApi();
    }, [planet]);

    const callPeopleApi = async () => {
        if (currentResidents.length > 0) {
            const response = await Promise.all(currentResidents.map((resident: string) => getPeopleApi(resident)));
            console.log(response.map((res: any) => res.data));
            saveResidents(response.map((res: any) => res.data));
        }
    }

    const handlePageClick = async (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % planet.residents.length;
        endOffset = newOffset + itemsPerPage;
        currentResidents = planet.residents.slice(newOffset, endOffset);
        callPeopleApi();
    };

    return (
        <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
        />
    );
}

export default PaginatedItems;

