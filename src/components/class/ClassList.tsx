import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import DropShadow from "react-native-drop-shadow";
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { ICourseData } from '../home/HomeList';
import { useAuthStore } from '@/store/auth';
import { API_URL } from '@/const';

interface ClassProps {
    courseData: ICourseData[]
    getCourses: () => void
}
interface IClassListItem extends ICourseData {
    index: number
}

const ClassListItem = ({ data, getCourses }: { data: ICourseData, getCourses: () => void }) => {
    console.log('data', data)
    const { token } = useAuthStore()
    const onPressSubmitEnroll = async (id: number) => {
        console.log('submit enroll', `${API_URL}/courses/${id}/enroll`)
        const response = await fetch(`${API_URL}/courses/${id}/enroll`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('submit enroll', json)
        if (json.status) {
            Alert.alert('Enroll berhasil!')
            getCourses()
        }
        if (response.status === 400) Alert.alert('Diskusi gagal ditambahkan!')
    };
    return (
        <DropShadow style={{
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        }}>
            <TouchableOpacity
                onPress={() => Alert.alert(
                    'Enroll to this course?',
                    `${data.name}`,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                onPressSubmitEnroll(data.id)
                            }
                            ,
                            style: 'cancel',
                        },
                        {
                            text: 'Cancel',
                            onPress: () => Alert.alert('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                                'This alert was dismissed by tapping outside of the alert dialog.',
                            ),
                    },
                )}
            >
                <View

                    style={{
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
                        {data.is_enrolled && <View style={{ display: 'flex', alignItems: 'flex-end' }} >
                            <View style={{ padding: 2, backgroundColor: 'green', width: 70, borderRadius: 10 }}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Enrolled</Text>
                            </View>
                        </View>}
                        <Text style={{ fontWeight: '700', fontSize: 16 }}>{data.name}</Text>
                        <Text style={{ fontWeight: '400', fontSize: 12 }}>{data.description}</Text>
                        <Text style={{ fontWeight: '400', fontSize: 14 }}>{data.lecturer.name}</Text>
                        {/* <View style={{ display: 'flex', justifyContent: 'center', width: `${data.progress}%`, backgroundColor: "green", height: 20 }}> */}

                    </View>
                </View>

            </TouchableOpacity>
        </DropShadow >
    )
}
function ClassList({ courseData, getCourses }: ClassProps) {
    console.log('courseData', courseData)
    return (
        <FlatList
            data={courseData}
            keyExtractor={(item, index) => "List-" + index}
            renderItem={({ item }) => <ClassListItem data={item} getCourses={getCourses} {...item} />}

            scrollEnabled={true}
        />
    )
}

export default ClassList