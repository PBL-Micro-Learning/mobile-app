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
import Logo from '@/theme/assets/images/1.png';

import { ImageVariant } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";

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

	const HeaderImage = () => {
		return (
			(
				<ImageVariant source={Logo} style={{ width: 40, height: 40, borderRadius: 20 }} />
			)
		)
	}
	const Logout = () => {
		return (
			(
				<Text
					onPress={() => removeAuthToken()}
					style={{ color: "#AE2929", fontSize: 20, fontWeight: '700' }}
				>Logout</Text>
			)
		)
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
					headerShown: true,
					tabBarActiveTintColor: colors.red500,
					tabBarInactiveTintColor: colors.gray400,
				}}
			>
				<Tab.Screen name="Home" component={Home}
					options={{
						headerTitle: HeaderImage,
						headerRight: Logout,
					}}
				/>
				<Tab.Screen name="Search" component={Search}
					options={{
						headerTitle: HeaderImage,
						headerRight: Logout,
					}}
				/>
				<Tab.Screen name="Class" component={Class}
					options={{
						headerTitle: HeaderImage,
						headerRight: Logout,
					}}
				/>
				<Tab.Screen name="Profile" component={Profile}
					options={{
						headerTitle: HeaderImage,
						headerRight: Logout,
					}}
				/>
			</Tab.Navigator>
		</SafeScreen>
	);
}

export default Dashboard;
