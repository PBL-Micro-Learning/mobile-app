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

type Props = {
    lessonId: number
    setEditMode: any
}

function EditLesson({ lessonId, setEditMode }: Props) {
    const { token, setAuthToken, setAuthData } = useAuthStore()
    const { course, setCourseData } = useCourseStore()
    console.log('course inside lecturer', course)
    const [name, onChangeName] = useState("");
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

    const onSubmitEditLesson = async () => {
        console.log('body', {
            course_id: course.id,
            title: name,
            description
        })
        try {
            const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: course.id,
                    title: name,
                    description
                }),
            })
            const json = await response.json()
            console.log('edit lesson', json)
            if (response.status === 200) {
                Alert.alert('Buat Materi Berhasil')
                // getCourseDetail(course)
                onChangeName('')
                onChangeDescription('')
                setEditMode(false)
            }
            if (response.status === 400) {
                Alert.alert('Gagal membuat materi')
                setEditMode(false)
            }

        } catch (error) {
            Alert.alert('Gagal membuat materi')
            setEditMode(false)
        }
    };

    const getLessonById = async () => {
        try {
            const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('get lesson by id', json)
            if (response.status) {
                onChangeName(json?.data?.title)
                onChangeDescription(json?.data?.description)
            }
            if (!response.status) Alert.alert('Gagal get lesson by id')

        } catch (error) {
            Alert.alert('Gagal get lesson by id')
        }
    };

    useEffect(() => {
        getLessonById()
    }, [lessonId])


    return (
        <SafeScreen>
            <ScrollView>
                <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>

                    <View
                        style={[
                            layout.justifyCenter,
                            layout.fullWidth,
                            gutters.marginTop_16,
                            { gap: 10 }
                        ]}
                    >
                        <Button
                            onPress={() => setEditMode(false)}
                            title="Mode Buat Materi"
                            color={'#004aad'}
                            accessibilityLabel="Mode Buat Materi"
                        />
                    </View>
                    <View style={[layout.justifyCenter]}>
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={onChangeName}
                            value={name}
                            placeholder="Nama Materi"
                        />
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={onChangeDescription}
                            value={description}
                            placeholder="Deskripsi"
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
                            onPress={onSubmitEditLesson}
                            title="Edit Materi"
                            color={'#004aad'}
                            accessibilityLabel="Edit Materi"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    );
}

export default EditLesson;
