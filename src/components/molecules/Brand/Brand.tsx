import { View, DimensionValue } from 'react-native';

import Logo from '@/theme/assets/images/microlearning.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';

type Props = {
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function Brand({ height, width, mode }: Props) {
	const { layout } = useTheme();

	if (!isImageSourcePropType(Logo) || !isImageSourcePropType(Logo)) {
		throw new Error('Image source is not valid');
	}

	return (
		<View testID="brand-img-wrapper" style={{ height, width }}>
			<ImageVariant
				testID="brand-img"
				style={[layout.fullHeight, layout.fullWidth]}
				source={Logo}
				sourceDark={Logo}
				resizeMode={mode}
			/>
		</View>
	);
}

Brand.defaultProps = {
	height: 200,
	width: 200,
	mode: 'contain',
};

export default Brand;
