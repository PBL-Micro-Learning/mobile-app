import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Dashboard, Login, Register, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';
import { useAuthStore } from '@/store/auth';
const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();
	const { token } = useAuthStore();
	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }} initialRouteName='Login'>
				{!token ?
					<>
						<Stack.Screen name="Startup" component={Startup} />
						<Stack.Screen name="Register" component={Register} />
						<Stack.Screen name="Login" component={Login} />
					</>
					:
					<>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</>
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
