import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                return jsonValue != null ? setData(JSON.parse(jsonValue)) : _loadData();
            } catch (e) {
                // error reading value
            }
        }

        getData()
        // _loadData()
    }, []);

    // if (isLoading) {
    //     return <Spinner />;
    // }

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
    .then(res => {
        _storeData(res)
    })
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

