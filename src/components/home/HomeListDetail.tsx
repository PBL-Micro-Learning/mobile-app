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

function HomeListDetail() {
    const { course }: { course: ICourseData } = useCourseStore()
    const { token, data } = useAuthStore()
    console.log('course detail', course)


    const { setMode, setLessonData } = useCourseStore()
    const [discussion, setDiscussion] = useState('')
    const onPressSubmitDiscussion = async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: discussion,
            }),
        })
        const json = await response.json()
        console.log('login', json.data)
        if (response.status === 200) {
            Alert.alert('Diskusi berhasil ditambahkan!')
        }
        if (response.status === 400) Alert.alert('Diskusi gagal ditambahkan!')
    };
    return (
        <ScrollView>
            <ImageVariant source={{ uri: course.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} />
            <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{course.name}</Text>
            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Detail Materi</Text>
                <Text style={{ fontWeight: '400', fontSize: 20, marginVertical: 8 }}>{course.description}</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Materi</Text>
                {course?.progress?.total_contents &&
                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Total Video: {course.progress.total_contents}</Text>
                }
                {course?.lessons?.map((l, lIdx) => {
                    return <View key={`lesson-${lIdx}`} style={{ paddingVertical: 20, paddingHorizontal: 10, width: '100%', borderWidth: 1, borderColor: 'black' }}>
                        <TouchableOpacity onPress={() => {
                            setMode('LESSONDETAIL')
                            setLessonData(l)
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{lIdx + 1}. {l.title}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 2 }}>{l.description}</Text>
                            {/* {l?.progress?.percentage &&
                                <View style={{ display: 'flex', justifyContent: 'center', width: `${l.progress.percentage}%`, backgroundColor: "green", height: 20 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 12, marginLeft: 4, color: 'white' }}>{l.progress.percentage}%</Text>
                                </View>
                            } */}
                        </TouchableOpacity>
                    </View>
                })}
            </View>
            {data.role === 'LECTURER' && <CreateLesson />}
            <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Button
                    onPress={() => setMode('LIST')}
                    title="Kembali"
                    color={'gray'}
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