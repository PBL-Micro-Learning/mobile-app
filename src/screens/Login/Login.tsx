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
const genders = ["Pria", "Wanita"];

function Login({ navigation }) {
	const { t } = useTranslation(["example", "welcome"]);
	const [name, onChangeName] = useState("");
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

	useEffect(() => {
		if (isSuccess) {
			Alert.alert(t("example:welcome", data.name));
		}
	}, [isSuccess, data]);

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
		console.log('login', json)
		if (response.status === 200) Alert.alert('Login Success!')
		if (response.status === 400) Alert.alert('Login Failed!')
	};

	return (
		<SafeScreen>
			<ScrollView>
				<View style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_80,
				]}>
					<View style={[layout.relative, backgrounds.gray100, components.circle250]} />

					<View style={[layout.absolute, gutters.paddingTop_80]}>
						<Brand height={300} width={300} />
					</View>
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
					<View style={[layout.justifyCenter]}>
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
							color={colors.gray800}
							accessibilityLabel="Learn more about this purple button"
						/>
						<Button
							title="Go to Register"
							onPress={() => navigation.navigate('Register')}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Login;
