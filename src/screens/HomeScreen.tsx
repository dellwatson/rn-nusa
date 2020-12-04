import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import _ from 'lodash'
import { DataContext } from '../../DataProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomScroll from '../components/CustomScroll'

export default ({ navigation }) => {
    const { setData, data } = useContext(DataContext);
    const [state, setState] = useState(20)


    const [searchQuery, setSearchQuery] = React.useState('');

    let result = !!data.length && _.filter(data, (obj: any) => _.some(obj, (val: any) => {
        return _.includes(val, searchQuery.toLowerCase())
    }));

    const display = !!searchQuery.length ? result : _.uniqBy(data, 'albumId')

    console.log(display.length, 'display')
    return (
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={x => setSearchQuery(x)}
                value={searchQuery}
            />
            {/* <CustomScroll {...{ data: display }} /> */}
            <ScrollView
                style={{ flex: 1, }}>
                {!!data.length && display.slice(0, state).map(({ title, albumId }, i) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { albumId, detail: data.filter(o => o.albumId === albumId) })}
                        style={{
                            margin: 5, borderWidth: 1,
                        }}
                        key={i}>
                        <Text>{title}</Text>
                        <Text>{albumId}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </>
    )
}

// based Album

/**
 * searchInput
 *
 * animation
 *
 * delete
 *
 * addData -> modal RN slide
 *
 * refresh load
 *
 * sort by album -> filter for nevaigation
 *
 */