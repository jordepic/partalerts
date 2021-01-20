import react, { useContext } from 'react';
import { SearchAndAddPart } from "../components/searchAndAddPart";
import { UserPartsList } from '../components/userPartsList';
import { LoadContext } from '../contexts/loadContext';
import { PartContext } from '../contexts/partContext';
import { loadPartsForUser } from '../network/part';

export const PartPage = () => {

    const load = useContext(LoadContext);
    const part = useContext(PartContext)

    const fetchParts = async () => {
        load.setLoading(true);
        let partsList = await loadPartsForUser(part.page, part.filterName);
        console.log(partsList);
        load.setLoading(false);
        if (Array.isArray(partsList)) {
            part.setParts([]);
            part.setNumPages(0);
        }
        else {
            part.setParts(partsList.parts);
            part.setNumPages(partsList.numPages);
        }
      }

    return (
        <div>
            <SearchAndAddPart fetchParts={fetchParts} />
            <UserPartsList fetchParts={fetchParts}/>
        </div>
    )
}