import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Alert, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useCourseStore } from '@/store/course';
import { API_URL } from '@/const';
import { ICourseData, ILesson } from './HomeList';

function ContentDetail() {
    const { course, lesson, setMode, setContentData }: { course: ICourseData, lesson: ILesson, setMode: (data: any) => void, setContentData: (data: any) => void } = useCourseStore()
    const dummyQuiz = [{ text: 'lorem ipsum dolor sit amet', option: ['blbl', 'asa', 'asdASdjljk', 'plklklj'], answer: null }, { text: 'lorem ipsum dolor sit', option: ['blbl', 'asa', 'asdASdjljk', 'plklklj'], answer: null }]
    const [discussion, setDiscussion] = useState('')
    const [quiz, setQuiz] = useState<any>(dummyQuiz)
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
    return (
        <ScrollView>
            <ImageVariant source={{ uri: course.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} />
            <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{course.name}</Text>
            <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>Lesson: {lesson.title}</Text>
            <Text style={{ fontWeight: '400', fontSize: 14, marginVertical: 2 }}>{lesson.description}</Text>

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Materi</Text>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Total Video: {lesson.progress.total_contents}</Text>
                {lesson?.contents?.map((c, lIdx) => {
                    return <View key={`lesson-${lIdx}`} style={{ paddingVertical: 20, paddingHorizontal: 10, width: '100%', borderWidth: 1, borderColor: 'black' }}>
                        <TouchableOpacity onPress={() => {
                            setMode('LESSONDETAIL')
                            setContentData(c)
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{lIdx + 1}. {c.title}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 2 }}>{c.body}</Text>
                        </TouchableOpacity>
                    </View>
                })}
            </View>

            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Diskusi</Text>
                <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, borderWidth: 1, borderColor: 'black', width: '100%' }}>
                    {[{ name: 'Student 1', text: 'Test' }].map((item) => <View style={{ paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{item.name}</Text>
                        <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 8 }}>{item.text}</Text>
                    </View>)}
                </View>
                <TextInput
                    style={{ width: '100%', marginVertical: 12, padding: 12, height: 40, borderWidth: 1 }}
                    onChangeText={(e) => setDiscussion(e)}
                    value={discussion}
                    placeholder="Tulis Diskusi di sini"
                />
                <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Button
                        onPress={onPressSubmitDiscussion}
                        title="Kirim"
                        color={'gray'}
                    />
                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                <View style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    {dummyQuiz.map((item, index) => <View key={`quiz-${index}`} style={{ paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{item.text}</Text>
                        <RadioGroup onPress={(e) => handleAnswerQuiz(index, e)} radioButtons={item.option.map((i, idx) => {
                            return { id: `${idx}`, label: i, value: i }
                        })} selectedId={`${quiz[index].answer}`} />
                    </View>)}
                </View>
                <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Button
                        onPress={onPressSubmitDiscussion}
                        title="Kirim"
                        color={'gray'}
                    />
                </View>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Button
                    onPress={() => setMode('LESSONDETAIL')}
                    title="Kembali"
                    color={'gray'}
                />
            </View>
        </ScrollView>
    )
}

export default ContentDetail