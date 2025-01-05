import { View, StyleProp, ViewStyle } from 'react-native';

interface SpacerProps {
    width?: number | string;
    height?: number | string;
}

export const Spacer = ({ width, height }: SpacerProps) => {
    return (
        <View
            style={
                {
                    width: width as ViewStyle["width"],
                    height: height as ViewStyle["height"],
                } as StyleProp<ViewStyle>
            }
        />
    );
};
