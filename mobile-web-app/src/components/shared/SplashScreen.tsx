import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { Colors, FontSize, Spacing } from '../../styles/theme';

interface SplashScreenProps {
	onFinish: () => void;
	duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
	onFinish,
	duration = 2500,
}) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.8)).current;

	useEffect(() => {
		// Fade in animation
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				useNativeDriver: true,
			}),
		]).start();

		// Wait and then fade out
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				onFinish();
			});
		}, duration);

		return () => clearTimeout(timer);
	}, [fadeAnim, scaleAnim, onFinish, duration]);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.content,
					{
						opacity: fadeAnim,
						transform: [{ scale: scaleAnim }],
					},
				]}
			>
				   <View style={styles.logoContainer}>
						{/* se ao inves de ser uma imagem ser um icone personalizavel fazer desta maneira */}
					   {/* <Text style={styles.logoText}>📱</Text> */}
					   <Image
						   source={require('../../../assets/kik.webp')}
						   style={{ width: 80, height: 80, borderRadius: 40 }}
						   resizeMode="cover"
					   />
				   </View>
				<Text style={styles.title}>Teste</Text>
				<Text style={styles.subtitle}>Carregando...</Text>
				<View style={styles.loadingBar}>
					<Animated.View
						style={[
							styles.loadingProgress,
							{
								width: fadeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: ['0%', '100%'],
								}),
							},
						]}
					/>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		alignItems: 'center',
	},
	logoContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.backgroundCard,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Spacing.lg,
		borderWidth: 2,
		borderColor: Colors.primary,
	},
	logoText: {
		fontSize: 50,
	},
	title: {
		fontSize: FontSize.xxxl,
		fontWeight: 'bold',
		color: Colors.text,
		marginBottom: Spacing.sm,
	},
	subtitle: {
		fontSize: FontSize.md,
		color: Colors.textSecondary,
		marginBottom: Spacing.xl,
	},
	loadingBar: {
		width: 200,
		height: 4,
		backgroundColor: Colors.surface,
		borderRadius: 2,
		overflow: 'hidden',
	},
	loadingProgress: {
		height: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 2,
	},
});
