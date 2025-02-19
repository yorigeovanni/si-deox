import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <LinearGradient
        colors={['#991B1B', '#500724']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* 404 Illustration */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80' }}
          style={styles.illustration}
        />

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.errorCode}>404</Text>
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.description}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#991B1B" />
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>

          <Link href="/" asChild>
            <TouchableOpacity style={styles.homeButton}>
              <Ionicons name="home" size={20} color="#FFFFFF" />
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustration: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 32,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  errorCode: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 280,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  backButtonText: {
    color: '#991B1B',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#991B1B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});