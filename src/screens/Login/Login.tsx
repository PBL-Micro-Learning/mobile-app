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
const genders = ["Pria", "Wanita"];

function Login({ navigation }: any) {
	const { token, setAuthToken, setAuthData } = useAuthStore()
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

	const { isSuccess, data, isFetching } = useQuery({
		queryKey: ["example", currentId],
		queryFn: () => {
			return fetchOne(currentId);
		},
		enabled: currentId >= 0,
	});

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
		console.log('login', json.data)
		if (response.status === 200) {
			Alert.alert('Login Success!')
			setAuthToken(json.data.token)
			setAuthData(json.data)
			navigation.navigate('Dashboard')
		}
		if (response.status === 400) Alert.alert('Login Failed!')
	};

	console.log('token', token);
	return (
		<SafeScreen>
			<ScrollView>
				<View style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_80,
				]}>
					<View style={[layout.relative, components.circle250]} />

					<View style={[layout.absolute]}>
						<Brand height={200} width={200} />
					</View>
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
					<View style={[layout.justifyCenter]}>
						<TextInput
							style={[
								gutters.marginVertical_12,
								gutters.padding_12,
								{ height: 40, borderWidth: 1, color: 'black' },
							]}
							onChangeText={onChangeEmail}
							value={email}
							placeholder="Email"
						/>
						<TextInput
							style={[
								gutters.marginVertical_12,
								gutters.padding_12,
								{ height: 40, borderWidth: 1, color: 'black' },
							]}
							onChangeText={onChangePassword}
							value={password}
							placeholder="Password"
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
							onPress={onPressLogin}
							title="Login"
							color={"#004aad"}
							accessibilityLabel="Login"
						/>
						{/* <Button
							title="Go to Register"
							onPress={() => navigation.navigate('Register')}
						/> */}
					</View>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Login;
