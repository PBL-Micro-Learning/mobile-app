import React, { useEffect, useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Alert, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCourseStore } from '@/store/course';
import { API_URL } from '@/const';
import { useAuthStore } from '@/store/auth';
import { ICourseData } from './HomeList';
import CreateLesson from './CreateLesson';
import EditLesson from './EditLesson';

function HomeListDetail() {
    const { course }: { course: ICourseData } = useCourseStore()
    const { token, data } = useAuthStore()
    const [lessonId, setLessonId] = useState(0)
    const [editMode, setEditMode] = useState(false)
    console.log('course detail', course)


    const { setMode, setLessonData } = useCourseStore()
    const onSubmitDeleteLesson = async (lessonId: number) => {
        try {
            const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('delete lesson', json)
            if (response.status) {
                Alert.alert('Hapus Materi Berhasil')
                setMode('LIST')
            }
            if (!response.status) Alert.alert('Gagal menghapus materi')

        } catch (error) {
            Alert.alert('Gagal menghapus materi')
        }
    };
    return (
        <ScrollView>
            <ImageVariant source={{ uri: course?.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} />
            <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{course?.name}</Text>
            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Detail Materi</Text>
                <Text style={{ fontWeight: '400', fontSize: 20, marginVertical: 8 }}>{course?.description}</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Materi</Text>
                {course?.progress?.total_contents &&
                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Total Video: {course?.progress.total_contents}</Text>
                }
                {course?.lessons?.[0]?.title && course?.lessons?.map((l, lIdx) => {
                    return <View key={`lesson-${lIdx}`} style={{ paddingVertical: 20, paddingHorizontal: 10, width: '100%', borderWidth: 1, borderColor: 'black' }}>
                        <TouchableOpacity onPress={() => {
                            console.log('HomeListDetail data', l)
                            setMode('LESSONDETAIL')
                            setLessonData(l)
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{lIdx + 1}. {l.title}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 2 }}>{l.description}</Text>
                            {l?.progress?.percentage ?
                                <View style={{ display: 'flex', justifyContent: 'center', width: `${l.progress.percentage}%`, backgroundColor: "green", height: 20 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 12, marginLeft: 4, color: 'white' }}>{l.progress.percentage}%</Text>
                                </View> : null
                            }
                        </TouchableOpacity>
                        {data?.role === 'LECTURER' &&
                            <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button
                                    onPress={() => {
                                        Alert.alert(
                                            'Apakah kamu yakin untuk menghapus materi ini?',
                                            `${l.title} - ${l.id}`,
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => {
                                                        onSubmitDeleteLesson(l.id)
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
                                        )
                                    }}
                                    title="Hapus"
                                    color={'#800000'}
                                />
                                <Button
                                    onPress={() => {
                                        setEditMode(true)
                                        setLessonId(l?.id)
                                    }
                                    }
                                    title="Edit"
                                    color={'#004aad'}
                                />
                            </View>
                        }
                    </View>
                })}
            </View>
            {data?.role === 'LECTURER' && !editMode && <CreateLesson />}
            {data?.role === 'LECTURER' && editMode && <EditLesson lessonId={lessonId} setEditMode={setEditMode} />}
            <View style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 50 }}>
                <Button
                    onPress={() => {
                        setMode('LIST')
                    }
                    }
                    title="Kembali"
                    color={'#004aad'}
                />
            </View>
        </ ScrollView>
        // <FlatList
        //     data={courseData}
        //     keyExtractor={(item, index) => "List-" + index}
        //     renderItem={({ item, index }) => <HomeListItem index={index} {...item} />}
        //     scrollEnabled={true}
        // />
    )
}

export default HomeListDetail