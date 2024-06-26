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
import { ICourseData } from "./HomeList";
import SelectDropdown from "react-native-select-dropdown";

function AnswerQuiz() {
    const { token, setAuthToken, setAuthData } = useAuthStore()
    const { course, lesson, setCourseData } = useCourseStore()
    console.log('lesson inside lessonDetail', lesson)
    const [loading, setLoading] = useState(false)
    const [name, onChangeName] = useState("");
    const options = ["A", "B", "C", "D"]
    const [answer, onChangeAnswer] = useState("");
    const [description, onChangeDescription] = useState("");
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

    const onSubmitAnswer = async () => {
        try {
            const response = await fetch(`${API_URL}/quizzes`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lesson_id: lesson.id,
                    title: name,
                    description
                }),
            })
            const json = await response.json()
            console.log('create Quiz', json)
            if (response.status === 200) {
                Alert.alert('Buat Quiz Berhasil')
                getCourseDetail(course)
                onChangeName('')
                onChangeDescription('')
            }
            if (response.status === 400) Alert.alert('Gagal membuat materi')

        } catch (error) {
            Alert.alert('Gagal membuat materi')
        }
    };

    const onMockGetQuiz = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 3000)
    }

    return (
        <SafeScreen>
            {!loading ?
                <ScrollView>
                    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
                        <View style={[layout.justifyCenter]}>
                            <Text style={{fontWeight: '700'}}>Question 1</Text>
                            <SelectDropdown
                                buttonStyle={[
                                    gutters.marginVertical_12,
                                    layout.fullWidth,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                data={options}
                                defaultButtonText="Select Answer"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    onChangeAnswer(selectedItem)
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
                        </View>

                        <View
                            style={[
                                layout.justifyCenter,
                                layout.fullWidth,
                                gutters.marginTop_16,
                                { gap: 10 }
                            ]}
                        >
                            <Button
                                // onPress={onSubmitAnswer}
                                onPress={onMockGetQuiz}
                                title="Kirim Jawaban"
                                color={'#004aad'}
                                accessibilityLabel="Kirim Jawaban"
                            />
                        </View>
                    </View>
                </ScrollView>
                : <View style={{ padding: 20 }}><Text style={{ textAlign: 'center' }}>Loading new quiz...</Text></View>
            }
        </SafeScreen>
    );
}

export default AnswerQuiz;
