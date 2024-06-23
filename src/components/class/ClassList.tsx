import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/1.png';
import DropShadow from "react-native-drop-shadow";
import { Text, View } from 'react-native';

interface ClassProps {
    courseData: ICourseData[]
}
interface ICourseData {
    name: string
    description: string
}

interface IData {
    name: string
    teacherName: string
    time: string
    progress: number
}
interface IClassListItem extends ICourseData {
    index: number
}

const dummyData = [
    {
        name: 'Dasar Pemrograman Javascript: INTRO',
        teacherName: 'Sandhika Galih',
        time: '7:53 Min',
        progress: 100
    }, {
        name: 'Apa Itu Javascript?',
        teacherName: 'Sandhika Galih',
        time: '9:51 Min',
        progress: 50
    }, {
        name: 'Bahasa Pemrograman',
        teacherName: 'Sandhika Galih',
        time: '11:43 Min',
        progress: 30

    }
]
const ClassListItem = (data: IClassListItem) => {
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
                    <Text style={{ fontWeight: '400', fontSize: 16 }}>{data.description}</Text>
                    {/* <Text style={{ fontWeight: '400', fontSize: 16 }}>{data.teacherName}</Text> */}
                    {/* <View style={{ display: 'flex', justifyContent: 'center', width: `${data.progress}%`, backgroundColor: "green", height: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 12, marginLeft: 4, color: 'white' }}>{data.progress}%</Text>
                    </View> */}

                </View>
            </View>
        </DropShadow>
    )
}
function ClassList({ courseData }: ClassProps) {
    return (
        <FlatList
            data={courseData}
            keyExtractor={(item, index) => "List-" + index}
            renderItem={({ item, index }) => <ClassListItem index={index} {...item} />}

            scrollEnabled={true}
        />
    )
}

export default ClassList