import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	Register: undefined;
	Login: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
