import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Text, View } from 'react-native';

interface SearchProps {
    search: string,
    data: ICourseData[]
}
interface ILecturer {
    id: number
    name: string
}
interface ICourseData {
    name: string
    description: string
    cover_url: string
    lecturer: ILecturer
}
interface ISearchListItem extends ICourseData {
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
                <ImageVariant source={{ uri: data.cover_url }} style={{ width: 90, height: 90, borderRadius: 20 }} />
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flex: 1,
                }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>{data.name}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 12 }}>{data.description}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 14 }}>{data.lecturer.name}</Text>
                    {/* <View style={{ display: 'flex', justifyContent: 'center', width: `${data.progress}%`, backgroundColor: "green", height: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 12, marginLeft: 4, color: 'white' }}>{data.progress}%</Text>
                    </View> */}

                </View>
            </View>
        </DropShadow>
    )
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