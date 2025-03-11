import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  attachments?: { type: 'image' | 'file'; url: string }[];
}

export default function LiveChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);
  const [attachments, setAttachments] = useState<{ type: 'image' | 'file'; url: string }[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setAttachments([...attachments, { type: 'image', url: result.assets[0].uri }]);
    }
  };

  const sendMessage = () => {
    if (message.trim() === '' && attachments.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setAttachments([]);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. Our agent will respond shortly.',
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Chat Header */}
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
            <Ionicons name="person" size={20} color="#34C759" />
          </View>
          <View className="ml-3">
            <Text className="font-semibold">Support Agent</Text>
            <Text className="text-green-600 text-sm">Online</Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        className="flex-1 p-4"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`mb-4 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <View
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.sender === 'user' ? 'bg-primary' : 'bg-white'
              }`}
            >
              {msg.attachments?.map((attachment, index) => (
                <View key={index} className="mb-2">
                  {attachment.type === 'image' && (
                    <Image
                      source={{ uri: attachment.url }}
                      className="w-48 h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                </View>
              ))}
              <Text
                className={msg.sender === 'user' ? 'text-white' : 'text-gray-800'}
              >
                {msg.text}
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <View className="bg-white p-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {attachments.map((attachment, index) => (
              <View key={index} className="mr-2 relative">
                <Image
                  source={{ uri: attachment.url }}
                  className="w-16 h-16 rounded-lg"
                />
                <TouchableOpacity
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
                  onPress={() => removeAttachment(index)}
                >
                  <Ionicons name="close" size={12} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="bg-white p-4 flex-row items-end">
          <TouchableOpacity 
            className="mr-2"
            onPress={pickImage}
          >
            <Ionicons name="logo-ionic" size={24} color="#007AFF" />
          </TouchableOpacity>
          <View className="flex-1 bg-gray-100 rounded-2xl p-2 mr-2">
            <TextInput
              className="max-h-24"
              multiline
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity
            className="bg-primary w-10 h-10 rounded-full items-center justify-center"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}