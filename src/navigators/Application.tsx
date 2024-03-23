import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login, Register, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';
const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }} initialRouteName='Login'>
				<Stack.Screen name="Startup" component={Startup} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
