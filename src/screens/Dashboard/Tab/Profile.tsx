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
import Logo from '@/theme/assets/images/1.png';

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
const genders = ["Pria", "Wanita"];

function Profile({ navigation }) {
    const { data: authData, setAuthToken, removeAuthToken } = useAuthStore()
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

    const [currentId, setCurrentId] = useState(-1);

    console.log('authData', authData)

    const onPressLogin = async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
        const json = await response.json()
        console.log('login', json.data.user.token)
        if (response.status === 200) {
            Alert.alert('Login Success!')
            setAuthToken(json.data.user.token)
            navigation.navigate('Dashboard')
        }
        if (response.status === 400) Alert.alert('Login Failed!')
    };

    return (
        <SafeScreen>
            <ScrollView>
                <View
                    style={[
                        layout.justifyCenter,
                        layout.itemsCenter,
                        gutters.marginTop_80,
                        { gap: 30, width: "100%" }
                    ]}
                >
                    <ImageVariant source={Logo} style={{ width: 150, height: 150, borderRadius: 20 }} />
                    <Text style={[fonts.size_16, fonts.gray800, fonts.bold, { color: "#AE2929" }]}>
                        ubah photo
                    </Text>
                    <View style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "lightgray", width: "100%", marginHorizontal: 8 }}>
                        <Text style={[fonts.alignCenter, fonts.size_24, fonts.gray800, fonts.bold]}>
                            {authData?.name || '-'}
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "lightgray", width: "100%", marginHorizontal: 8 }}>
                        <Text style={[fonts.alignCenter, fonts.size_24, fonts.gray800, fonts.bold]}>
                            {authData?.email || '-'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeScreen>
    );
}

export default Profile;
