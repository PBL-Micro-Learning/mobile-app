import React, { useEffect, useRef, useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { ImageVariant } from '../atoms'
import Logo from '@/theme/assets/images/microlearning.png';
import DropShadow from "react-native-drop-shadow";
import { Alert, Button, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useCourseStore } from '@/store/course';
import { API_URL } from '@/const';
import { IContent, ICourseData, ILesson } from './HomeList';
import WebView from 'react-native-webview'
import { useAuthStore } from '@/store/auth';
import CreateContent from './CreateContent';
import Icon from 'react-native-vector-icons/Entypo';


function ContentDetail() {
    const { course, lesson, content, setMode, setCourseData, setContentData }: { course: ICourseData, lesson: ILesson, content: IContent, setMode: (data: any) => void, setCourseData: (data: any) => void, setContentData: (data: any) => void } = useCourseStore()
    const dummyQuiz = [{ text: 'lorem ipsum dolor sit amet', option: ['blbl', 'asa', 'asdASdjljk', 'plklklj'], answer: null }, { text: 'lorem ipsum dolor sit', option: ['blbl', 'asa', 'asdASdjljk', 'plklklj'], answer: null }]
    const { token, data } = useAuthStore()
    const [discussion, setDiscussion] = useState('')
    const [quiz, setQuiz] = useState<any>(dummyQuiz)

    const getContentDetail = async (data: IContent) => {
        try {
            const response = await fetch(`${API_URL}/contents/${data?.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('content detail by id', JSON.stringify(json))

            if (response.status === 200) {
                setContentData(json.data)
            }
            if (response.status === 400) Alert.alert('Get Content Detail Failed')
        } catch (error) {
            // Alert.alert('Get Courses Failed')
        }
    };
    const onPressSubmitDiscussion = async () => {
        console.log('submit discussion', `${API_URL}/contents/${content?.id}/comment`)
        const response = await fetch(`${API_URL}/contents/${content?.id}/comment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: discussion,
                date: new Date(),
            }),
        })
        const json = await response.json()
        console.log('submit discussion', json)
        if (json.status) {
            Alert.alert('Diskusi berhasil ditambahkan!')
            setDiscussion('')
            getContentDetail(content)
        }
        if (response.status === 400) Alert.alert('Diskusi gagal ditambahkan!')
    };

    const onPressLike = async () => {
        console.log('submit like', `${API_URL}/contents/${content?.id}/like`)
        const response = await fetch(`${API_URL}/contents/${content?.id}/like`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('submit like', json)
        if (response.status) {
            Alert.alert('Like berhasil ditambahkan!')
            getContentDetail(content)
        }
        if (!response.status) Alert.alert('Like gagal ditambahkan!')
    };

    const onPressWatch = async () => {
        console.log('submit watch', `${API_URL}/contents/${content?.id}/watch`)
        const response = await fetch(`${API_URL}/contents/${content?.id}/watch`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('submit watch', json)
    };

    const handleAnswerQuiz = (questionIdx: number, answerIdx: string) => {
        console.log('questionIdx, answerIdx', questionIdx, answerIdx)
        const newData = quiz
        newData[questionIdx].answer = answerIdx
        console.log('newData', newData)
        // setQuiz()

    }
    const getYoutubeID = (url: string) => {
        console.log('youtube url', url)
        // defining the regular expression
        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        const allMatches = regex.exec(url);
        console.log('allMatches', allMatches)

        // Matching the values
        if (allMatches && allMatches.length >= 3) {
            console.log('allMatches[3]', allMatches[3])
            return allMatches[3];
        }
        return 'aETL4vduQfs'
    }

    useEffect(() => {
        if (data?.role === 'STUDENT') onPressWatch()
    }, [data?.role])

    console.log('content', content)
    console.log('contentDetail data', data)
    return (
        <ScrollView nestedScrollEnabled>
            <>
                <View style={{ flex: 1 }}>
                    <WebView
                        style={{
                            height: 150,
                            width: Dimensions.get('window').width,
                            marginTop: 0,
                        }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        // source={{ uri: 'https://www.youtube.com/embed/' + getYoutubeID(content?.video_url) }}
                        source={{ uri: `${content?.video_url}?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque` }}
                    />
                </View>
                {/* <ImageVariant source={{ uri: course.cover_url }} style={{ width: '100%', height: 90, borderRadius: 20 }} /> */}
                <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>{content?.title}</Text>
                <View style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 10 }}>
                    <Icon size={30} name='thumbs-up' onPress={onPressLike} color={content?.likes ? '#004aad' : "gray"} />
                    <Text>Likes : {content?.likes_count}</Text>
                    <Text>Liked : {content?.likes ? 'true' : 'false'}</Text>
                </View>
                {/* <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>Lesson: {lesson.title}</Text>
            <Text style={{ fontWeight: '400', fontSize: 14, marginVertical: 2 }}>{lesson.description}</Text> */}

                {/* <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
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
            </View> */}

                <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 8 }}>Diskusi</Text>
                    <FlatList
                        nestedScrollEnabled
                        data={content?.comments}
                        keyExtractor={(item, index) => "comment-" + index}
                        renderItem={({ item, index }) =>
                            <View style={{ paddingHorizontal: 20 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 8 }}>{item.user.name}</Text>
                                    <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 8 }}>{`${new Date(item.date).getUTCDate()}-${new Date(item.date).getUTCMonth()}-${new Date(item.date).getUTCFullYear()} ${new Date(item.date).getHours()}:${new Date(item.date).getMinutes()}:${new Date(item.date).getSeconds()}`}</Text>
                                </View>
                                <Text style={{ fontWeight: '400', fontSize: 12, marginVertical: 0 }}>{item.content}</Text>
                            </View>
                        }
                        scrollEnabled={true}
                        style={{ height: 100 }}
                    />
                    <>
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
                                color={'#004aad'}
                            />
                        </View>
                    </>
                </View>

            </>
            {/* <View style={{ display: 'flex', alignItems: 'flex-start', paddingVertical: 20, width: '100%' }}>
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
                        color={'#004aad'}
                    />
                </View>
            </View> */}
            <View style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 50 }}>
                <Button
                    onPress={() => setMode('LESSONDETAIL')}
                    title="Kembali"
                    color={'#004aad'}
                />
            </View>
        </ScrollView>
    )
}

export default ContentDetail