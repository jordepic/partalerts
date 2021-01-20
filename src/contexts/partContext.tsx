import react, { useState } from 'react';

export interface Part {
  id: number,
  name: string,
  type: string
}

export interface PartContextData {
  parts: Part[],
  setParts: React.Dispatch<React.SetStateAction<Part[]>>,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  numPages: number,
  setNumPages: React.Dispatch<React.SetStateAction<number>>,
  filterName: string,
  setFilterName: React.Dispatch<React.SetStateAction<string>>

}

export const PartContext = react.createContext<PartContextData>({
  parts: [],
  page: 1,
  numPages: 1,
  filterName: '',
  setParts: () => { },
  setPage: () => { },
  setNumPages: () => { },
  setFilterName: () => { }
});