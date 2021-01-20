import react, { useContext, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { LoadContext } from '../contexts/loadContext';
import { PartContext } from '../contexts/partContext';
import { searchParts, addPartForUser } from "../network/part";
import { Button } from "antd";
import styles from "../styles/searchAndAddPart.module.css";

export const SearchAndAddPart = (props: any) => {

  let [part, setPart] = useState({});
  let [error, setError] = useState('');

  let partContext = useContext(PartContext);
  let load = useContext(LoadContext);

  const changePart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPart(e.target.value);
  }

  const loadParts = async (search: string, loadedOptions: any, { page }: { page: number }) => {

    const response = await searchParts(search, page);

    return {
      options: response.parts.map((part: any) => { return { value: part, label: part.name } }),
      hasMore: response.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

  const addPart = async () => {
    if ("label" in part) {
      load.setLoading(true);
      let msg = await addPartForUser((part as any).label);
      load.setLoading(false);
      if (msg === "Success") {
        await props.fetchParts();
      }
      else {
        setError("Error adding part. Make sure that you have not already added it.");
      }
    }
    else {
      setError('You need to choose a part to add.');
    }
  }

  return (
    <div>
      <AsyncPaginate
        value={part}
        loadOptions={loadParts as any}
        onChange={setPart}
        additional={{
          page: 1,
        }}
        className={styles.Select}
      />
      <Button className={styles.Button} type="primary" size="large" onClick={async () => await addPart()}>
        Add Part
      </Button>
    </div>
  )
}