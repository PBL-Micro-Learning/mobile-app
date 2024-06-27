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
const genders = ["male", "female"];
const roles = ["student", "lecturer"];

function Profile() {
    const { data: authData, token, setAuthToken, removeAuthToken } = useAuthStore()
    const [name, onChangeName] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [gender, onChangeGender] = useState("male");
    const [role, onChangeRole] = useState("student");
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

    const onPressCreateUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    role,
                    gender,
                    email,
                    password
                }),
            })
            const json = await response.json()
            console.log('create User', json)
            if (response.status) {
                Alert.alert('Create User Success!')
                onChangeName('')
                onChangeEmail('')
                onChangePassword('')
                onChangeGender('')
                onChangeRole('')
            }
            if (!response.status) Alert.alert('Create User Failed!')
        } catch (error) {
            Alert.alert('Create User Failed!')
        }
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
                    {/* <Text style={[fonts.size_16, fonts.gray800, fonts.bold, { color: "#004aad" }]}>
                        ubah photo
                    </Text> */}
                    <View style={{ borderWidth: 1, borderColor: "#004aad", backgroundColor: "lightgray", width: "100%", marginHorizontal: 8 }}>
                        <Text style={[fonts.alignCenter, fonts.size_24, fonts.gray800, fonts.bold]}>
                            {authData?.name || '-'}
                        </Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#004aad", backgroundColor: "lightgray", width: "100%", marginHorizontal: 8 }}>
                        <Text style={[fonts.alignCenter, fonts.size_24, fonts.gray800, fonts.bold]}>
                            {authData?.email || '-'}
                        </Text>
                    </View>
                </View>
                {authData?.role === 'ADMIN' &&
                    <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
                        <View style={[layout.justifyCenter]}>
                            <Text style={[fonts.alignCenter, fonts.size_24, fonts.gray800, fonts.bold]}>
                                Create New User
                            </Text>
                            <TextInput
                                style={[
                                    gutters.marginVertical_12,
                                    gutters.padding_12,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                onChangeText={onChangeName}
                                value={name}
                                placeholder="Name"
                            />
                            <TextInput
                                style={[
                                    gutters.marginVertical_12,
                                    gutters.padding_12,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                onChangeText={onChangeEmail}
                                value={email}
                                placeholder="Email"
                            />
                            <TextInput
                                style={[
                                    gutters.marginVertical_12,
                                    gutters.padding_12,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                onChangeText={onChangePassword}
                                value={password}
                                placeholder="Password"
                            />
                            <SelectDropdown
                                buttonStyle={[
                                    gutters.marginVertical_12,
                                    layout.fullWidth,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                data={genders}
                                defaultButtonText="Select Gender"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    onChangeGender(selectedItem)
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
                            <SelectDropdown
                                buttonStyle={[
                                    gutters.marginVertical_12,
                                    layout.fullWidth,
                                    { height: 40, borderWidth: 1 },
                                ]}
                                data={roles}
                                defaultButtonText="Select Role"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    onChangeRole(selectedItem)
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
                                disabled={
                                    name === "" ||
                                    password === "" ||
                                    role === "" ||
                                    gender === "" ||
                                    email === ""
                                }
                                onPress={onPressCreateUser}
                                title="Create User"
                                color={"#004aad"}
                                accessibilityLabel="Create User"
                            />
                            {/* <Button
							title="Go to Register"
							onPress={() => navigation.navigate('Register')}
						/> */}
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeScreen>
    );
}

export default Profile;
