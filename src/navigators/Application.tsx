import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';
import Register from '@/screens/Register/Register';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Startup" component={Startup} />
				<Stack.Screen name="Register" component={Register} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
