import React, { useState, createContext, useEffect } from 'react';
// import { User } from 'firebase';
// import { auth, } from './components/Firebase';
// import Spinner from './components/Spinner';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const DataContext = createContext({
    data: [],
    setData: () => { },
});

export default ({ children }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    //check asyncstorage udah pernah load ?
    //klo belom load
    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@data')
                return jsonValue != null ? setData(JSON.parse(jsonValue).slice(0, 3)) : _loadData();
            } catch (e) {
                // error reading value
            }
        }

        console.log('xx called')
        getData()
    }, []);

    // if (isLoading) {
    //     return <Spinner />;
    // }
    // console.log(getData(), 'data')

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
            }}>
            {children}
        </DataContext.Provider>
    );
};

const _loadData = () => fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => res.json())
    .then(res => _storeData(res))
    .catch(e => alert(e.toString()))


export const _storeData = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@data', jsonValue)
    } catch (e) {
        // saving error
    }
}

export const _getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@data')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

