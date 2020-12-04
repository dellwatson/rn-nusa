import React, { useState, useContext } from 'react'
import { View, TextInput, Button } from 'react-native'
import { DataContext, _storeData } from '../../DataProvider'

export default ({ navigation }) => {
    const { setData, data } = useContext(DataContext);

    const [state, setState] = useState({
        id: new Date().valueOf(),
        albumId: null,
        title: null,
        url: null,
    })

    return (
        <View style={{ flex: 1, padding: 20, marginTop: 100 }}>
            {['albumId', 'title', 'url'].map((field, i) => <Input key={i} {...{ state, setState, field }} />)}
            <Button
                onPress={_ => {
                    const newData = [...data, { ...state, albumId: Number(state.albumId) }]
                    setData(newData)
                    _storeData(newData)
                    navigation.goBack()
                }}
                title="Submit"
                color="hotpink"
            />
        </View>
    )
}

const Input = ({ state, setState, field }: any) => (
    <TextInput
        placeholder={`${field}...`}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        onChangeText={x => setState({ ...state, [field]: x })}
        value={state[field]}
    />
)