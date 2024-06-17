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
    url: string
}
interface IHomeListItem extends IData {
    index: number
}

const dummyData = [
    {
        name: 'Dasar Pemrograman Javascript: INTRO',
        teacherName: 'Sandhika Galih',
        time: '7:53 Min',
        url: 'https://youtu.be/RUTV_5m4VeI?si=t6LVt7ckbJPNUwb3'
    }, {
        name: 'Apa Itu Javascript?',
        teacherName: 'Sandhika Galih',
        time: '9:51 Min',
        url: 'https://youtu.be/Ncrlg9kTC6U?si=huUXkZoiFL_t81pb'
    }, {
        name: 'Bahasa Pemrograman',
        teacherName: 'Sandhika Galih',
        time: '11:43 Min',
        url: 'https://youtu.be/dugL0oYx0w0?si=1w9dOzOf9Uaws9k_'

    }
]
const HomeListItem = (data: IHomeListItem) => {
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
                    <Text style={{ fontWeight: '400', fontSize: 14 }}>{data.time}</Text>

                </View>
            </View>
        </DropShadow>
    )
}
function HomeList() {
    return (
        <FlatList
            data={dummyData}
            keyExtractor={(item, index) => "List-" + index}
            renderItem={({ item, index }) => <HomeListItem index={index} {...item} />}
            scrollEnabled={true}
        />
    )
}

export default HomeList