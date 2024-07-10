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
import CreateQuestion from './CreateQuestion';
import EditContent from './EditContent';

function LessonDetail() {
    const { data, token } = useAuthStore()
    const { course, lesson, setMode, setContentData }: { course: ICourseData, lesson: ILesson, setMode: (data: any) => void, setContentData: (data: any) => void } = useCourseStore()
    console.log('data inside lessonDetail', data)
    console.log('lesson detail', lesson)
    const dummyQuiz = [
        { content: 'Test Question', option: [{ content: 'A', is_correct: false }, { content: 'B', is_correct: false }, { content: 'C', is_correct: false }, { content: 'D', is_correct: true }] }
    ]
    const [contentId, setContentId] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [quiz, setQuiz] = useState<any>(dummyQuiz)
    const getQuizById = async (id: number) => {
        const response = await fetch(`${API_URL}/quizzes/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('quiz by id', json.data)
        if (response.status) {
            setQuiz(json.data)
            // Alert.alert('Diskusi berhasil ditambahkan!')
        }
        if (!response.status) Alert.alert('Quiz gagal dibaca!')
    };

    const onSubmitDeleteContent = async (contentId: number) => {
        try {
            const response = await fetch(`${API_URL}/lessons/${contentId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('delete content', json)
            if (response.status) {
                Alert.alert('Hapus Konten Berhasil')
                setMode('LIST')
            }
            if (!response.status) Alert.alert('Gagal menghapus konten')

        } catch (error) {
            Alert.alert('Gagal menghapus konten')
        }
    };

    const handleAnswerQuiz = (questionIdx: number, answerIdx: string) => {
        console.log('questionIdx, answerIdx', questionIdx, answerIdx)
        const newData = quiz
        newData[questionIdx].answer = answerIdx
        console.log('newData', newData)
        // setQuiz()

    }

    useLayoutEffect(() => {
        if (lesson?.quiz_id) getQuizById(lesson?.quiz_id)
    }, [lesson?.quiz_id])

    return (
        <ScrollView>
            <ImageVariant source={{ uri: course?.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} />
            <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{course?.name}</Text>
            <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>Lesson: {lesson?.title}</Text>
            <Text style={{ fontWeight: '400', fontSize: 14, marginVertical: 2 }}>{lesson?.description}</Text>

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Materi</Text>
                {lesson?.progress?.total_contents &&
                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Total Video: {lesson?.progress.total_contents}</Text>
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
                        {data?.role === 'LECTURER' &&
                            <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button
                                    onPress={() => {
                                        Alert.alert(
                                            'Apakah kamu yakin untuk menghapus materi ini?',
                                            `${c.title} - ${c.id}`,
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => {
                                                        onSubmitDeleteContent(c.id)
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
                                        setContentId(c?.id)
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

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%', margin: 4 }}>
                <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Quiz: {quiz?.description}</Text>
                <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {quiz?.questions?.map((item: any, index: number) => <View key={`quiz-${index}`} style={{ paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{index + 1}. {item.content}</Text>
                    </View>)}
                </View>
                {data?.role === 'STUDENT' &&
                    <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginHorizontal: 10 }}>
                        <View key={`student-result`} style={{ paddingHorizontal: 25, display: 'flex', width: '100%' }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Total Pertanyaan: {lesson?.quiz_results?.question_count}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Benar: {lesson?.quiz_results?.correct_answer_count}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Salah: {lesson?.quiz_results?.wrong_answer_count}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Nilai: {lesson?.quiz_results?.correct_answer_ratio}</Text>
                        </View>
                    </View>
                }
                {data?.role === 'LECTURER' &&
                    <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginHorizontal: 10 }}>
                        {quiz?.results?.map((item: any, index: number) => <View key={`result-${index}`} style={{ paddingHorizontal: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 20 }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{item?.user_name}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Benar: {item?.correct_answer_count}</Text>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>Nilai: {item?.correct_answer_ratio}</Text>
                        </View>)}
                    </View>
                }
                {/* <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Button
                        onPress={onPressSubmitDiscussion}
                        title="Kirim"
                        color={'#004aad'}
                    />
                </View> */}
            </View>

            {data?.role === "STUDENT" && lesson?.quiz_id &&
                <AnswerQuiz />

            }
            {data?.role === 'LECTURER' && !editMode && <CreateContent />}
            {data?.role === 'LECTURER' && editMode && <EditContent contentId={contentId} setEditMode={setEditMode} />}
            {data?.role === 'LECTURER' && !lesson?.quiz_id ?
                <CreateQuiz />
                : <CreateQuestion />
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