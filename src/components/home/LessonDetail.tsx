import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Alert, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useCourseStore } from '@/store/course';
import { API_URL } from '@/const';
import { ICourseData, ILesson } from './HomeList';
import { useAuthStore } from '@/store/auth';
import CreateQuiz from './CreateQuiz';
import AnswerQuiz from './AnswerQuiz';
import CreateContent from './CreateContent';

function LessonDetail() {
    const { data, token } = useAuthStore()
    const { course, lesson, setMode, setContentData }: { course: ICourseData, lesson: ILesson, setMode: (data: any) => void, setContentData: (data: any) => void } = useCourseStore()
    console.log('data inside lessonDetail', data)
    console.log('lesson detail', lesson)
    const dummyQuiz = [
        { content: 'Test Question', option: [{ content: 'A', is_correct: false }, { content: 'B', is_correct: false }, { content: 'C', is_correct: false }, { content: 'D', is_correct: true }] }
    ]
    const [discussion, setDiscussion] = useState('')
    const [quiz, setQuiz] = useState<any>(dummyQuiz)
    const getQuizById = async (id: number) => {
        const response = await fetch(`${API_URL}/quizzes/${id}/questions`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('quiz by id', json.data)
        if (response.status === 200) {
            setQuiz(json.data)
            // Alert.alert('Diskusi berhasil ditambahkan!')
        }
        if (response.status === 400) Alert.alert('Quiz gagal dibaca!')
    };

    const onPressSubmitDiscussion = async () => {
        setMode('LIST')
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: quiz,
            }),
        })
        const json = await response.json()
        console.log('login', json.data)
        if (response.status === 200) {
            Alert.alert('Diskusi berhasil ditambahkan!')
        }
        if (response.status === 400) Alert.alert('Diskusi gagal ditambahkan!')
    };

    const handleAnswerQuiz = (questionIdx: number, answerIdx: string) => {
        console.log('questionIdx, answerIdx', questionIdx, answerIdx)
        const newData = quiz
        newData[questionIdx].answer = answerIdx
        console.log('newData', newData)
        // setQuiz()

    }

    useLayoutEffect(() => {
        if (lesson.quiz_id) getQuizById(lesson.quiz_id)
    }, [lesson.quiz_id])

    return (
        <ScrollView>
            <ImageVariant source={{ uri: course.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} />
            <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{course.name}</Text>
            <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>Lesson: {lesson.title}</Text>
            <Text style={{ fontWeight: '400', fontSize: 14, marginVertical: 2 }}>{lesson.description}</Text>

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Materi</Text>
                {lesson?.progress?.total_contents &&
                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Total Video: {lesson.progress.total_contents}</Text>
                }
                {lesson?.contents?.length > 0 && lesson?.contents?.map((c, lIdx) => {
                    return <View key={`lesson-${lIdx}`} style={{ paddingVertical: 20, paddingHorizontal: 10, width: '100%', borderWidth: 1, borderColor: 'black' }}>
                        <TouchableOpacity onPress={() => {
                            console.log('content data', c)
                            setMode('CONTENTDETAIL')
                            setContentData(c)
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{lIdx + 1}. {c.title}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 2 }}>{c.body}</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {dummyQuiz.map((item, index) => <View key={`quiz-${index}`} style={{ paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{item.content}</Text>
                        {/* <RadioGroup onPress={(e) => handleAnswerQuiz(index, e)} radioButtons={item.option.map((i, idx) => {
                            return { id: `${idx}`, label: i, value: i }
                        })} selectedId={`${quiz[index].answer}`} /> */}
                    </View>)}
                </View>
                {/* <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Button
                        onPress={onPressSubmitDiscussion}
                        title="Kirim"
                        color={'#004aad'}
                    />
                </View> */}
            </View>

            {data.role === "STUDENT" &&
                <AnswerQuiz />

            }
            {data.role === 'LECTURER' &&
                <>
                    <CreateContent />
                    <CreateQuiz />
                </>
            }
            <View style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 50 }}>
                <Button
                    onPress={() => setMode('DETAIL')}
                    title="Kembali"
                    color={'#004aad'}
                />
            </View>
        </ScrollView>
    )
}

export default LessonDetail