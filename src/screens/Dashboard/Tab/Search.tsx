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
import SearchList from "@/components/search/SearchList";
const genders = ["Pria", "Wanita"];

const dummyData = [
    {
        name: 'Dasar Pemrograman Javascript: INTRO',
        teacherName: 'Sandhika Galih',
        time: '7:53 Min',
        progress: 100
    }, {
        name: 'Apa Itu Javascript?',
        teacherName: 'Sandhika Galih',
        time: '9:51 Min',
        progress: 50
    }, {
        name: 'Bahasa Pemrograman',
        teacherName: 'Sandhika Galih',
        time: '11:43 Min',
        progress: 30

    }
]
function Search({ navigation }) {
    const categories = ['All', 'Matkul 1', 'Matkul 2', 'Matkul 3']
    const { token, setAuthToken } = useAuthStore()
    const [search, onChangeSearch] = useState("");
    const [listData, setListData] = useState(dummyData)
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
    useEffect(() => {
        const filteredSearch = dummyData.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        console.log('filteredSearch', filteredSearch)
        setListData(filteredSearch)
    }, [search])



    const getCourses = async () => {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log('courses', json)
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
            <Text style={{ color: '#AE2929', fontWeight: '700', fontSize: 28 }}>Cari</Text>
            <TextInput
                style={[
                    gutters.marginVertical_12,
                    gutters.padding_12,
                    { height: 40, borderWidth: 1 },
                ]}
                onChangeText={onChangeSearch}
                value={search}
                placeholder="Search"
            />
            <SearchList search={search} data={listData} />
        </SafeScreen>
    );
}

export default Search;
