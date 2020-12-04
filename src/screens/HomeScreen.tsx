import React, { useContext, useState } from 'react'
import { View, Text, Animated, TextInput, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native'
import _ from 'lodash'
import { DataContext } from '../../DataProvider'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
// import CustomScroll from '../components/CustomScroll'


export default ({ navigation }) => {
    const { setData, data } = useContext(DataContext);
    const [pagination, setPagination] = useState(20)


    const [searchQuery, setSearchQuery] = React.useState('');

    let result = !!data.length && _.filter(data, (obj: any) => _.some(obj, (val: any) => {
        return _.includes(String(val).toLowerCase(), searchQuery.toLowerCase())
    }));

    const display = !!searchQuery.length ? result : _.uniqBy(data, 'albumId')
    return (
        <>
            <TextInput
                placeholder='Search...'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
                onChangeText={x => setSearchQuery(x)}
                value={searchQuery}
            />
            {/* <CustomScroll {...{ data: display }} /> */}
            <ScrollView
                onScroll={(e) => {
                    let paddingToBottom = 10;
                    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                    if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                        setPagination(pagination + 10)
                    }
                }}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 30 }}
                style={{ flex: 1, }}>

                {!!searchQuery.length && !!display.length &&
                    <Text style={{ color: 'green', textAlign: 'center' }}> what you lookin for is inside these albums</Text>}
                {!display.length && <Text style={{ color: 'red', textAlign: 'center' }}>There's nothing</Text>}

                {!!data.length && display.slice(0, pagination).map(({ title, albumId }, i) => {
                    const rand = Math.floor(Math.random() * 10);
                    const colorQ = "rgb(" + (215 - rand * 7) + "," + (185 - rand * 7) + "," + (185 - rand * 7) + " )";
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Detail', { albumId, detail: data.filter(o => o.albumId === albumId) })}
                            style={{
                                marginVertical: 7, borderRadius: 5,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                marginHorizontal: 15,
                                padding: '5%',
                                backgroundColor: colorQ,
                                opacity: 0.8

                            }}
                            key={i}>
                            <Text>Latest photo's title: {title}</Text>
                            <Text>Total photo: {data.filter(o => o.albumId === albumId).length}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Album Id: {albumId}</Text>
                        </TouchableOpacity>)
                }
                )}
            </ScrollView>
        </>
    )
}



