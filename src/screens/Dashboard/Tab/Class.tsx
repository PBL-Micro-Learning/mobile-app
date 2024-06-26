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

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
import SelectDropdown from "react-native-select-dropdown";
import { API_URL } from "@/const";
import { useAuthStore } from "@/store/auth";
import ClassList from "@/components/class/ClassList";
import { useIsFocused } from "@react-navigation/native";
import CreateClass from "@/components/class/CreateClass";
const genders = ["Pria", "Wanita"];

function Class() {
    const categories = ['All', 'Matkul 1', 'Matkul 2', 'Matkul 3']
    const isFocused = useIsFocused()
    const { token, data } = useAuthStore()
    const [mode, setMode] = useState<"create" | "view">('view');
    const [courses, setCourses] = useState([]);
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
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


    const getCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/courses`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            // console.log('my courses', JSON.stringify(json))

            if (response.status === 200) {
                setCourses(json.data)
            }
            if (response.status === 400) Alert.alert('Get Courses Failed')
        } catch (error) {
            // Alert.alert('Get Courses Failed')
        }
    };
    const handleCreateCourse = async () => {
        try {

            const response = await fetch(`${API_URL}/courses`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: 'Test Course',
                    description: 'for testing purpose'
                })
            })
            const json = await response.json()
            console.log('create course', json)
            // if (response.status === 200) {
            //     Alert.alert('Login Success!')
            //     setAuthToken(json.data.user.token)
            //     navigation.navigate('Dashboard')
            // }
            // if (response.status === 400) Alert.alert('Login Failed!')
        } catch (error) {
            console.log('error', error)
        }
    };
    useEffect(() => {
        console.log('auth data', data)
        getCourses()
    }, [isFocused, mode])

    return (
        <SafeScreen>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#004aad', fontWeight: '700', fontSize: 28, margin: 10 }}>Mata Kuliah</Text>
                {(data.role === 'LECTURER' || data.role === 'ADMIN') &&
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() => {
                            if (mode === 'view') setMode('create')
                            if (mode === 'create') setMode('view')
                        }
                        }
                        style={{ flex: 1 }}
                    >
                        <Text style={{ textAlign: 'right', color: '#004aad', fontWeight: '700', fontSize: 14, margin: 10 }}>
                            {mode === 'view' ? 'Buat Kelas' : 'Kembali'}
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            {mode === 'view' ?
                <ClassList courseData={courses} getCourses={getCourses} />
                : <CreateClass />
            }
        </SafeScreen>
    );
}

export default Class;
