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
import HomeList from "@/components/home/HomeList";
import { useIsFocused } from "@react-navigation/native";
import HomeListDetail from "@/components/home/HomeListDetail";
import { useCourseStore } from "@/store/course";
import LessonDetail from "@/components/home/LessonDetail";
import ContentDetail from "@/components/home/ContentDetail";
const genders = ["Pria", "Wanita"];

function Home() {
    const categories = ['All', 'Matkul 1', 'Matkul 2', 'Matkul 3']
    const isFocused = useIsFocused()
    const [courses, setCourses] = useState([]);
    const { mode, setMode } = useCourseStore()
    const { token, setAuthToken, data } = useAuthStore()
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
            console.log('my courses', JSON.stringify(json))

            if (response.status === 200) {
                setCourses(json.data)
            }
            if (response.status === 400) Alert.alert('Get Courses Failed')
        } catch (error) {
            // Alert.alert('Get Courses Failed')
        }
    };

    useEffect(() => {
        console.log('home isFocused', isFocused)
        getCourses()
        setMode('LIST')
        console.log('auth data', data)
    }, [isFocused])

    const ShowScreen = () => {

        if (mode === 'LIST') {
            return <HomeList courseData={courses} />
        }
        if (mode === 'DETAIL') {
            return <HomeListDetail />
        }
        if (mode === 'LESSONDETAIL') {
            return <LessonDetail />
        }
        if (mode === 'CONTENTDETAIL') {
            return <ContentDetail />
        }

    }

    return (
        <SafeScreen>
            <Text style={{ color: '#004aad', fontWeight: '700', fontSize: 28 }}>Beranda</Text>
            {/* <View style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4
            }}>
                {categories.map((c, idx) => {
                    return <View key={`category-${idx}`} style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: '#D9D9D9' }}><Text style={{ fontWeight: '700', color: '#000000' }}>{c}</Text></View>
                })
                }
            </View> */}
            <ShowScreen />
        </SafeScreen>
    );
}

export default Home;
