import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	Register: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
