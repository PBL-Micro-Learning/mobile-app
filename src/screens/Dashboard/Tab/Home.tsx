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
const genders = ["Pria", "Wanita"];

function Home({ navigation }) {
    const categories = ['All', 'Matkul 1', 'Matkul 2', 'Matkul 3']
    const { token, setAuthToken } = useAuthStore()
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
        const response = await fetch(`${API_URL}/courses`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('login', json)
        // if (response.status === 200) {
        //     Alert.alert('Login Success!')
        //     setAuthToken(json.data.user.token)
        //     navigation.navigate('Dashboard')
        // }
        // if (response.status === 400) Alert.alert('Login Failed!')
    };
    useEffect(() => {
        getCourses()
    }, [])

    return (
        <SafeScreen>
            <Text style={{ color: '#AE2929', fontWeight: '700', fontSize: 28 }}>Beranda</Text>
            <View style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4
            }}>
                {categories.map((c, idx) => {
                    return <View key={`category-${idx}`} style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: '#D9D9D9' }}><Text style={{ fontWeight: '700', color: '#000000' }}>{c}</Text></View>
                })
                }
            </View>
            <HomeList />
        </SafeScreen>
    );
}

export default Home;
