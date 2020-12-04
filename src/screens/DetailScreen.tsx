import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import _ from 'lodash'
import { DataContext } from '../../DataProvider'

export default (props) => {
    const { detail } = props.route.params

    //dapet data dari parent

    //setData buat hapus doang
    const { setData, data } = useContext(DataContext);

    const [pagination, setPagination] = useState(30)

    const [searchQuery, setSearchQuery] = React.useState('');

    //data result ambil dari parent
    let result = _.filter(detail, (obj: any) => _.some(obj, (val: any) => {
        return _.includes(val, searchQuery.toLowerCase())
    }));

    return (
        <>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={x => setSearchQuery(x)}
                value={searchQuery}
            />
            <ScrollView style={{ flex: 1 }}>
                {result.slice(0, pagination).map((item, i) =>
                    <View key={i}>
                        <Text>{item.title}</Text>
                        <Text>{item.albumId}</Text>
                    </View>
                )}
            </ScrollView>
        </>
    )
}

