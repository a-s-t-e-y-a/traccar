import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Tokens } from '@/theme/tokens';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    style,
                    error && styles.inputError
                ]}
                placeholderTextColor={Tokens.colors.gray}
                autoCorrect={false}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Tokens.spacing.md,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Tokens.colors.text,
        marginBottom: Tokens.spacing.xs,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: Tokens.radius.md,
        paddingHorizontal: Tokens.spacing.md,
        fontSize: 16,
        color: Tokens.colors.text,
        backgroundColor: Tokens.colors.white,
    },
    inputError: {
        borderColor: Tokens.colors.error,
    },
    errorText: {
        fontSize: 12,
        color: Tokens.colors.error,
        marginTop: Tokens.spacing.xs,
    },
});
