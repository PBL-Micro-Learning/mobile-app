import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Text, View } from 'react-native';

interface IData {
    name: string
    teacherName: string
    time: string
    progress: number
}
interface ISearchListItem extends IData {
    index: number
}

const SearchListItem = (data: ISearchListItem) => {
    console.log('data', data)
    return (
        <DropShadow style={{
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                padding: 10,
                margin: 5,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,

            }}>
                <ImageVariant source={Logo} style={{ width: 90, height: 90, borderRadius: 20 }} />
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flex: 1,
                }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>{data.name}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 16 }}>{data.teacherName}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 16 }}>{data.time}</Text>
                    {/* <View style={{ display: 'flex', justifyContent: 'center', width: `${data.progress}%`, backgroundColor: "green", height: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 12, marginLeft: 4, color: 'white' }}>{data.progress}%</Text>
                    </View> */}

                </View>
            </View>
        </DropShadow>
    )
}
type SearchProps = {
    search: string,
    data: IData[]
}
function SearchList({ search, data }: SearchProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => "List-" + index}
            renderItem={({ item, index }) => <SearchListItem index={index} {...item} />}

            scrollEnabled={true}
        />
    )
}

export default SearchList