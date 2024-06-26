import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useCourseStore } from '@/store/course';
import { API_URL } from '@/const';
import { useAuthStore } from '@/store/auth';

interface HomeProps {
    courseData: ICourseData[]
}
interface ILecturer {
    id: number
    name: string
}

interface IProgress {
    total_contents: number,
    watched_contents: number,
    percentage: number
}
export interface IContent {
    id: number,
    title: string,
    body: string,
    video_url: string
    likes: boolean
    likes_count: number
    comments: IComment[]
}

interface IUser {
    id: number,
    name: string,
    profile_picture_url: string

}
interface IComment {
    id: number,
    content: string,
    date: string,
    user: IUser
}
export interface ILesson {
    id: 0,
    title: string,
    description: string,
    course_id: number,
    progress: IProgress,
    contents: IContent[]
}
export interface ICourseData {
    id: number
    name: string
    description: string
    cover_url: string
    lecturer: ILecturer
    is_enrolled: true
    progress: IProgress
    lessons: ILesson[]
}
interface IHomeListItem extends ICourseData {
    index: number
}

const HomeListItem = (data: IHomeListItem) => {
    const { setCourseData, setMode } = useCourseStore()
    const { token } = useAuthStore()
    console.log('data', data)
    const getCourseDetail = async (data: ICourseData) => {
        try {
            const response = await fetch(`${API_URL}/courses/${data.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('course detail by id', JSON.stringify(json))

            if (response.status === 200) {
                setCourseData(json.data)
            }
            if (response.status === 400) Alert.alert('Get Courses Detail Failed')
        } catch (error) {
            // Alert.alert('Get Courses Failed')
        }
    };

    return (
        <DropShadow style={{
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        }}>
            <TouchableOpacity onPress={() => {
                getCourseDetail(data)
                setMode('DETAIL')
            }
            }>
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

                    </View>
                </View>
            </TouchableOpacity>
        </DropShadow>
    )
}
function HomeList({ courseData }: HomeProps) {
    const enrolledCourse = courseData.filter(c => c.is_enrolled === true)
    return (
        <FlatList
            data={enrolledCourse}
            keyExtractor={(item, index) => "List-" + index}
            renderItem={({ item, index }) => <HomeListItem index={index} {...item} />}
            scrollEnabled={true}
        />
    )
}

export default HomeList