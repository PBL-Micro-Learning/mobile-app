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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Tab/Home";
import Profile from "./Tab/Profile";
import Search from "./Tab/Search";
import Class from "./Tab/Class";

const Tab = createBottomTabNavigator();

function Dashboard({ navigation }) {
	const { token, removeAuthToken } = useAuthStore()
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



	function TabBar({ state, descriptors, navigation }) {
		return (
			<View style={{ flexDirection: 'row' }}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ flex: 1 }}
						>
							<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

	return (
		<SafeScreen>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						bottom: 10,
					},
					tabBarStyle: {
						shadowRadius: 2.0,
						elevation: 2,
						shadowOpacity: 0.4,
						shadowOffset: {
							height: 0.4,
							width: 1,
						},
						shadowColor: '#000',
					},
					tabBarIconStyle: {
						top: 10,
					},
					headerShown: false,
					tabBarActiveTintColor: colors.red500,
					tabBarInactiveTintColor: colors.gray400,
				}}
			>
				<Tab.Screen name="Home" component={Home} />
				<Tab.Screen name="Search" component={Search} />
				<Tab.Screen name="Class" component={Class} />
				<Tab.Screen name="Profile" component={Profile} />
			</Tab.Navigator>
		</SafeScreen>
	);
}

export default Dashboard;
