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

function Example() {
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

	const onPressCreate = async () => {
		const response  = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password
			}),
		})
		if(response.status === 200) Alert.alert('Create Account Success!')
		if(response.status === 400) Alert.alert('Create Account Failed!')
	};

	return (
		<SafeScreen>
			<ScrollView>
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_80,
					]}
				>
					<Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
						Create Account
					</Text>
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
					<View style={[layout.justifyCenter]}>
						<TextInput
							style={[
								gutters.marginVertical_12,
								gutters.padding_12,
								{ height: 40, borderWidth: 1 },
							]}
							onChangeText={onChangeName}
							placeholder="Fullname"
							value={name}
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
						<SelectDropdown
							buttonStyle={[
								gutters.marginVertical_12,
								layout.fullWidth,
								{ height: 40, borderWidth: 1 },
							]}
							data={genders}
							onSelect={(selectedItem, index) => {
								console.log(selectedItem, index);
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
						]}
					>
						<Button
							onPress={onPressCreate}
							title="Create"
							color={colors.gray800}
							accessibilityLabel="Learn more about this purple button"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Example;
