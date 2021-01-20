import react, {createContext} from 'react';

export interface LoadContextData {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadContext = createContext<LoadContextData>({
    loading: false,
    setLoading: () => {}
});