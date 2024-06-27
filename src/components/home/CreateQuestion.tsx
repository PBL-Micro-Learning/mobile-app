import { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput,
    Button,
} from "react-native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { API_URL } from "@/const";
import { useAuthStore } from "@/store/auth";
import { useCourseStore } from "@/store/course";
import { ICourseData, ILesson } from "./HomeList";
import SelectDropdown from "react-native-select-dropdown";

function CreateQuestion() {
    const { token, setAuthToken, setAuthData } = useAuthStore()
    const { course, lesson, setCourseData, setLessonData } = useCourseStore()
    console.log('lesson inside lessonDetail', lesson)
    const opsi = ["A", "B", "C", "D"]
    const [name, onChangeName] = useState("");
    const [opsiA, setOpsiA] = useState("");
    const [opsiB, setOpsiB] = useState("");
    const [opsiC, setOpsiC] = useState("");
    const [opsiD, setOpsiD] = useState("");
    const [keyAnswer, setKeyAnswer] = useState("");
    const {
        colors,
        variant,
        changeTheme,
        layout,
        gutters,
        fonts,
        components,
        backgrounds,
    } = useTheme();

    const getLessonDetail = async (data: ILesson) => {
        try {
            const response = await fetch(`${API_URL}/lessons/${data.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('lesson detail by id', JSON.stringify(json))

            if (response.status === 200) {
                setLessonData(json.data)
            }
            if (response.status === 400) Alert.alert('Get Lesson Detail Failed')
        } catch (error) {
            Alert.alert('Get Lesson Failed')
        }
    };

    const onSubmitCreateQuestion = async () => {
        // const populateAnswer = () => {
        //     let result = []
        //     for (let i = 0; i < 4; i++) {
        //         let value;
        //         switch (i) {
        //             case 0:
        //             value = {content: opsiA, is_correct: keyAnswer==='A' } 
        //                 break;

        //             default:
        //                 break;
        //         }


        //     }
        // }
        const questionData = {
            quiz_id: lesson.quiz_id,
            content: name,
            options: [
                { content: opsiA, is_correct: keyAnswer === 'A' },
                { content: opsiB, is_correct: keyAnswer === 'B' },
                { content: opsiC, is_correct: keyAnswer === 'C' },
                { content: opsiD, is_correct: keyAnswer === 'D' },
            ]
        }
        console.log('submitQuestion', questionData)
        try {
            const response = await fetch(`${API_URL}/questions`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(questionData),
            })
            const json = await response.json()
            console.log('create questions', json)
            if (response.status === 200) {
                Alert.alert('Buat Questions Berhasil')
                getLessonDetail(lesson)
                onChangeName('')
                setOpsiA('')
                setOpsiB('')
                setOpsiC('')
                setOpsiD('')
                setKeyAnswer('')
            }
            if (response.status === 400) Alert.alert('Gagal membuat Questions')

        } catch (error) {
            Alert.alert('Gagal membuat Questions')
        }
    };

    return (
        <SafeScreen>
            <ScrollView>
                <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
                    <View style={[layout.justifyCenter]}>
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={onChangeName}
                            value={name}
                            placeholder="Pertanyaan"
                        />
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={setOpsiA}
                            value={opsiA}
                            placeholder="Opsi A"
                        />
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={setOpsiB}
                            value={opsiB}
                            placeholder="Opsi B"
                        />
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={setOpsiC}
                            value={opsiC}
                            placeholder="Opsi C"
                        />
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={setOpsiD}
                            value={opsiD}
                            placeholder="Opsi D"
                        />
                    </View>
                    <SelectDropdown
                        buttonStyle={[
                            gutters.marginVertical_12,
                            layout.fullWidth,
                            { height: 40, borderWidth: 1 },
                        ]}
                        data={opsi}
                        defaultButtonText="Pilih Jawaban Yang Benar"
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setKeyAnswer(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item;
                        }}
                    />
                    <View
                        style={[
                            layout.justifyCenter,
                            layout.fullWidth,
                            gutters.marginTop_16,
                            { gap: 10 }
                        ]}
                    >
                        <Button
                            disabled={name === "" || opsiA === "" || opsiB === '' || opsiC === '' || opsiD === '' || keyAnswer === ''}
                            onPress={onSubmitCreateQuestion}
                            title="Buat Pertanyaan"
                            color={'#004aad'}
                            accessibilityLabel="Buat Pertanyaan"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    );
}

export default CreateQuestion;
