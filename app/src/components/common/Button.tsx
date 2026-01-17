import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Tokens } from '@/theme/tokens';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    loading,
    variant = 'primary',
    style,
    textStyle,
    disabled,
    ...props
}) => {
    const getButtonStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: Tokens.colors.secondary };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Tokens.colors.primary
                };
            default:
                return { backgroundColor: Tokens.colors.primary };
        }
    };

    const getTextStyle = (): TextStyle => {
        switch (variant) {
            case 'outline':
                return { color: Tokens.colors.primary };
            case 'secondary':
                return { color: Tokens.colors.text };
            default:
                return { color: Tokens.colors.white };
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style, (disabled || loading) && styles.disabled]}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? Tokens.colors.primary : Tokens.colors.white} />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: Tokens.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Tokens.spacing.md,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    },
});
