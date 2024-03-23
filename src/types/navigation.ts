import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	Register: undefined;
	Login: undefined;
	Dashboard: undefined;
	Home: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
