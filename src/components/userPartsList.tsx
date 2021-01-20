import react, { useContext, useEffect, useState } from 'react';
import { LoadContext } from '../contexts/loadContext';
import { PartContext } from '../contexts/partContext';
import { deleteUserPart, loadPartsForUser } from '../network/part';
import ReactPaginate from 'react-paginate';
import styles from "../styles/userPartsList.module.css";
import { Button, Input, List, Pagination } from 'antd';

export const UserPartsList = (props: any) => {

  let load = useContext(LoadContext);
  let part = useContext(PartContext);

  const changeFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    part.setFilterName(e.target.value);
  }

  const changePage = (page: number, pageSize?: number) => {
    console.log(page);
    part.setPage(page);
  }

  const partComponents = part.parts.map(part => {
    return (
      <li id={part.id.toString()}>
        <p>{part.name}</p>
        <button style={{ height: "20px", width: "80px" }} onClick={async () => await deletePart(part.name)}>Delete</button>
      </li>
    )
  })

  const deletePart = async (name: string) => {
    load.setLoading(true);
    let msg = await deleteUserPart(name);
    load.setLoading(false);
    if (msg === "Success") {
      await props.fetchParts();
    }
  }

  useEffect(() => {
    props.fetchParts();
  }, [part.filterName, part.page]);

  return (
    <div>
      <Input placeholder="Search in your parts..." bordered={false} className={styles.Input} type="text" name="filterName" value={part.filterName} onChange={e => changeFilterName(e)}/>
      <br/> 
      <List
        className={styles.List}
        bordered
        dataSource={part.parts}
        renderItem={item => (
          <List.Item>
            <h4 className={styles.ListItem}>{item.name}</h4>
            <Button size="small" type="ghost" onClick={async () => await deletePart(item.name)}>Delete</Button>
          </List.Item>
        )}
      />
      <Pagination className={styles.Pagination} defaultPageSize={1} total={part.numPages} current={part.page} onChange={changePage}/>
    </div>
  )
}