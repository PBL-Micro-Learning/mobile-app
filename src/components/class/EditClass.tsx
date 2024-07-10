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

type Props = {
    classId: number
}

function EditClass({ classId }: Props) {
    console.log('classId', classId)
    const { token, setAuthToken, setAuthData } = useAuthStore()
    const [name, onChangeName] = useState("");
    const [description, onChangeDescription] = useState("");
    const [coverUrl, onChangeCoverUrl] = useState("");
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

    const getCourseById = async () => {
        console.log('getCourseById', classId)
        try {
            const response = await fetch(`${API_URL}/courses/${classId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            console.log('edited courses by id data', JSON.stringify(json))

            if (response.status) {
                onChangeName(json.data.name)
                onChangeDescription(json.data.description)
                onChangeCoverUrl(json.data.cover_url)
            }
            if (!response.status) Alert.alert('Get Courses By Failed')
        } catch (error) {
            // Alert.alert('Get Courses Failed')
        }
    };
    useEffect(() => {
        getCourseById()
    }, [classId])

    const onSubmitEditClass = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${classId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    cover_url: coverUrl
                }),
            })
            const json = await response.json()
            console.log('edit class', json)
            if (response.status) {
                Alert.alert('Edit Kelas Berhasil')
                onChangeName('')
                onChangeDescription('')
                onChangeCoverUrl('')
            }
            if (!response.status) Alert.alert('Gagal mengedit kelas')

        } catch (error) {
            Alert.alert('Gagal mengedit kelas')
        }
    };


    const onSubmitDeleteClass = async () => {
        try {
            const response = await fetch(`${API_URL}/courses/${classId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            const json = await response.json()
            console.log('delete class', json)
            if (response.status) {
                Alert.alert('Hapus Kelas Berhasil')
                onChangeName('')
                onChangeDescription('')
                onChangeCoverUrl('')
            }
            if (!response.status) Alert.alert('Gagal menghapus kelas')

        } catch (error) {
            Alert.alert('Gagal menghapus kelas')
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
                            placeholder="Nama Kelas"
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
                        <TextInput
                            style={[
                                gutters.marginVertical_12,
                                gutters.padding_12,
                                { height: 40, borderWidth: 1 },
                            ]}
                            onChangeText={onChangeCoverUrl}
                            value={coverUrl}
                            placeholder="Cover Url"
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
                            onPress={onSubmitEditClass}
                            title="Edit Kelas"
                            color={'#004aad'}
                            accessibilityLabel="Edit Kelas"
                        />
                        <Button
                            onPress={()=>{
                                Alert.alert(
                                    'Apakah kamu yakin untuk menghapus kelas ini?',
                                    `${name}`,
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => {
                                                onSubmitDeleteClass()
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
                            title="Hapus Kelas"
                            color={'#800000'}
                            accessibilityLabel="Hapus Kelas"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    );
}

export default EditClass;
