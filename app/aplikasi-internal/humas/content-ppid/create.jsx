import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    Modal,
    Pressable,
    BackHandler,
    Alert,
    FlatList,
    StyleSheet,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Ionicons } from '@expo/vector-icons';
  import { useState, useRef, useEffect } from 'react';
  import { useRouter } from 'expo-router';
  import { createPost } from '@/services/mockSocialService';
  import { BlurView } from 'expo-blur';
  import { ImageGrid } from '@/components/ui/ImageGrid';
  
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  
  const MOCK_IMAGES = [
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop&q=60',
  ];
  
  const MOCK_EMOJIS = ['😊', '❤️', '😂', '🎉', '👍', '🔥', '✨', '🌟', '💫', '🎨', '🌈', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎨', '🎭', '🎪'];
  
  export default function CreatePostScreen() {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [isPosting, setIsPosting] = useState(false);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const contentInputRef = useRef(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
    useEffect(() => {
      setHasUnsavedChanges(content.length > 0 || selectedImages.length > 0);
    }, [content, selectedImages]);
  
    useEffect(() => {
      const handleBackPress = () => {
        if (showMediaPicker || showEmojiPicker) {
          closeAllModals();
          return true;
        }
        if (hasUnsavedChanges) {
          Alert.alert(
            'Discard Changes?',
            'You have unsaved changes. Are you sure you want to discard them?',
            [
              { text: 'Keep Editing', style: 'cancel' },
              { 
                text: 'Discard',
                style: 'destructive',
                onPress: () => router.back()
              }
            ]
          );
          return true;
        }
        return false;
      };
  
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [hasUnsavedChanges, showMediaPicker, showEmojiPicker]);
  
    const handleSelectImage = (imageUri) => {
      if (selectedImages.length >= 10) {
        Alert.alert('Maximum Photos', 'You can only select up to 10 photos.');
        return;
      }
      setSelectedImages(prev => [...prev, imageUri]);
    };
  
    const handleRemoveImage = (index) => {
      setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };
  
    const handleReorderImages = (newOrder) => {
      setSelectedImages(newOrder);
    };
  
    const handleAddEmoji = (emoji) => {
      setContent(prev => prev + emoji);
      if (contentInputRef.current) {
        contentInputRef.current.focus();
      }
    };
  
    const closeAllModals = () => {
      setShowMediaPicker(false);
      setShowEmojiPicker(false);
    };
  
    const handlePost = async () => {
      if (!content.trim() && selectedImages.length === 0) {
        Alert.alert('Empty Post', 'Please add some text or images to your post.');
        return;
      }
  
      try {
        setIsPosting(true);
        
        // Create post with all selected images in their current order
        await createPost(content, selectedImages);
  
        // Navigate back to refresh the feed
      //  router.back();
      } catch (error) {
        Alert.alert('Error', 'Failed to create post. Please try again.');
      } finally {
        setIsPosting(false);
      }
    };
  
    const renderMediaPicker = () => (
      <Modal
        visible={showMediaPicker}
        transparent
        animationType="slide"
        onRequestClose={closeAllModals}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>Add Photos</Text>
                <TouchableOpacity
                  onPress={closeAllModals}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={20} color="#374151" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.photoCount}>
                {selectedImages.length}/10 photos selected
              </Text>
            </View>
            
            <FlatList
              data={MOCK_IMAGES}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const isSelected = selectedImages.includes(item);
                const selectionIndex = selectedImages.indexOf(item) + 1;
                
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (isSelected) {
                        setSelectedImages(prev => prev.filter(img => img !== item));
                      } else {
                        handleSelectImage(item);
                      }
                    }}
                    style={styles.imageContainer}
                  >
                    <Image
                      source={{ uri: item }}
                      style={[styles.gridImage, isSelected && styles.selectedImage]}
                    />
                    {isSelected && (
                      <View style={styles.selectionBadge}>
                        <Text style={styles.selectionNumber}>{selectionIndex}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            
            <SafeAreaView edges={['bottom']}>
              <View style={styles.bottomBar}>
                <TouchableOpacity 
                  style={styles.browseButton}
                  onPress={() => {
                    Alert.alert('Open Gallery', 'This would open your device gallery');
                  }}
                >
                  <Text style={styles.browseButtonText}>Browse Gallery</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    );
  
    const renderEmojiPicker = () => (
      <Modal
        visible={showEmojiPicker}
        transparent
        animationType="slide"
        onRequestClose={closeAllModals}
      >
        <Pressable style={styles.modalOverlay} onPress={closeAllModals}>
          <BlurView intensity={20} style={styles.emojiContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.emojiRow}>
                {MOCK_EMOJIS.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiButton}
                    onPress={() => {
                      handleAddEmoji(emoji);
                      closeAllModals();
                    }}
                  >
                    <Text style={styles.emoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </BlurView>
        </Pressable>
      </Modal>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                if (hasUnsavedChanges) {
                  Alert.alert(
                    'Discard Changes?',
                    'You have unsaved changes. Are you sure you want to discard them?',
                    [
                      { text: 'Keep Editing', style: 'cancel' },
                      { 
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => router.back()
                      }
                    ]
                  );
                } else {
                  router.back();
                }
              }}
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Create Post</Text>
            
            <TouchableOpacity
              style={[
                styles.postButton,
                (!content.trim() && selectedImages.length === 0) && styles.postButtonDisabled
              ]}
              onPress={handlePost}
              disabled={isPosting || (!content.trim() && selectedImages.length === 0)}
            >
              {isPosting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.postButtonText}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
  
          <ScrollView style={styles.content}>
            <TextInput
              ref={contentInputRef}
              style={styles.input}
              placeholder="What's on your mind?"
              placeholderTextColor="#9ca3af"
              multiline
              value={content}
              onChangeText={setContent}
            />
  
            {selectedImages.length > 0 && (
              <ImageGrid
                images={selectedImages}
                onRemoveImage={handleRemoveImage}
                onReorderImages={handleReorderImages}
              />
            )}
          </ScrollView>
  
          {/* Bottom Toolbar */}
          <View style={styles.toolbar}>
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => setShowMediaPicker(true)}
            >
              <Ionicons name="images" size={24} color="#ef4444" />
              <Text style={styles.toolbarButtonText}>Photo</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => setShowEmojiPicker(true)}
            >
              <Ionicons name="happy" size={24} color="#f59e0b" />
              <Text style={styles.toolbarButtonText}>Feeling</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={() => {
                Alert.alert('Location', 'This would open location picker');
              }}
            >
              <Ionicons name="location" size={24} color="#3b82f6" />
              <Text style={styles.toolbarButtonText}>Location</Text>
            </TouchableOpacity>
          </View>
  
          {renderMediaPicker()}
          {renderEmojiPicker()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111827',
    },
    postButton: {
      backgroundColor: '#3b82f6',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    postButtonDisabled: {
      backgroundColor: '#93c5fd',
    },
    postButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    content: {
      flex: 1,
    },
    input: {
      padding: 16,
      fontSize: 16,
      color: '#111827',
      minHeight: 120,
      textAlignVertical: 'top',
    },
    toolbar: {
      flexDirection: 'row',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      backgroundColor: '#fff',
    },
    toolbarButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    toolbarButtonText: {
      marginLeft: 8,
      color: '#4b5563',
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: '80%',
    },
    modalHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
    },
    modalHeaderContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#111827',
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoCount: {
      color: '#6b7280',
    },
    imageContainer: {
      flex: 1,
      aspectRatio: 1,
      padding: 2,
    },
    gridImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    selectedImage: {
      opacity: 0.7,
    },
    selectionBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#3b82f6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectionNumber: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
    },
    bottomBar: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
    browseButton: {
      backgroundColor: '#3b82f6',
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    browseButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    emojiContainer: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    emojiRow: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    emojiButton: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    emoji: {
      fontSize: 24,
    },
  });