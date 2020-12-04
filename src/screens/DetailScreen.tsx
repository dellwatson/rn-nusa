import React, { useContext, useState } from 'react'
import { StyleSheet, View, LayoutAnimation, Platform, UIManager, Text, TextInput, Image } from 'react-native'
import _ from 'lodash'
import { DataContext, _storeData } from '../../DataProvider'
import { FlatList, RectButton } from 'react-native-gesture-handler'
// import SwipeRow from '../components/SwipeRow'
import AndroidSwipe from '../components/AndroidSwipe'

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default ({ route: { params: { detail } } }) => {

    // for current page
    const [state, setState] = useState(detail)
    // for update global
    const { setData, data } = useContext(DataContext);

    const [pagination, setPagination] = useState(30)

    const [searchQuery, setSearchQuery] = React.useState('');

    let result = _.filter(state, (obj: any) => _.some(obj, (val: any) => {
        return _.includes(String(val).toLowerCase(), searchQuery.toLowerCase())
    }));

    return (
        <>
            <TextInput
                placeholder='Search...'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
                onChangeText={x => setSearchQuery(x)}
                value={searchQuery}
            />
            <Text style={{ color: 'grey', margin: 10, textAlign: 'center' }}>Swipe to delete</Text>

            <FlatList
                onEndReached={() => setPagination(pagination + 10)}
                onEndReachedThreshold={0.5}
                data={result.slice(0, pagination)}
                renderItem={({ id, title, albumId, ...rest }) => (
                    <RenderItem
                        {...{ data, setData, setState }}
                        {...rest}
                    />
                )}
            />
        </>
    )
}

const RenderItem = ({
    item,
    setState,
    swipeThreshold = -150,
    onSwipe = () => null,
    data,
    setData = () => null
}) => {
    const [img, setImg] = useState(item.url)
    return (
        <AndroidSwipe
            {...{ item, swipeThreshold, onSwipe }}
            key={item.id}
            onSwipe={() => {
                const newArr = data.filter(v => v !== item)
                setData(newArr)
                setState(newArr)
                _storeData(newArr)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            }}
        >
            <Image source={{ uri: img }}
                style={{ width: `100%`, height: 200 }}
                onError={() => setImg('https://i.stack.imgur.com/y9DpT.jpg')}
            />
            <View style={[StyleSheet.absoluteFill, { position: 'absolute' }]}>
                <Text style={[styles.text]}>id: {item.id}</Text>
                <Text style={[styles.title]}>{item.title}</Text>
            </View>
        </AndroidSwipe>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        padding: 25,
    },
    title: {
        fontSize: 12,
        color: 'black',
        padding: 10,
        backgroundColor: '#eee'

    }
});

