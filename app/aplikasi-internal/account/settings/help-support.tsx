import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Security and select 'Update Password'. Follow the instructions to create a new password."
  },
  {
    question: "How do I update my profile information?",
    answer: "Navigate to Settings > Account and tap on the information you'd like to update. Make your changes and tap 'Save'."
  },
  {
    question: "How do I change my notification settings?",
    answer: "Go to Settings > Notifications where you can customize all notification preferences including push notifications, emails, and alerts."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data. You can review our privacy policy for more details."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team through the contact form below, or email us directly at support@example.com."
  }
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    // Here you would typically send the support request
    //console.log('Support request submitted:', { subject, message });
    setSubject('');
    setMessage('');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Search Bar */}
      <View className="p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search help articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-between p-4">
        <TouchableOpacity 
          className="items-center flex-1 mx-2"
          onPress={() => router.push('/settings/live-chat')}
        >
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="chatbubbles" size={24} color="#007AFF" />
          </View>
          <Text className="text-center text-xs">Live Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1 mx-2">
          <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="call" size={24} color="#34C759" />
          </View>
          <Text className="text-center text-xs">Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1 mx-2">
          <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="mail" size={24} color="#5856D6" />
          </View>
          <Text className="text-center text-xs">Email</Text>
        </TouchableOpacity>
      </View>

      {/* FAQs */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Frequently Asked Questions</Text>
        {filteredFaqs.map((faq, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white rounded-lg mb-3 overflow-hidden"
            onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
          >
            <View className="p-4">
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold flex-1">{faq.question}</Text>
                <Ionicons
                  name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#666"
                />
              </View>
              {expandedFaq === index && (
                <Text className="text-gray-600 mt-2">{faq.answer}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Form */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Contact Support</Text>
        <View className="bg-white rounded-lg p-4">
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Subject</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-lg"
              placeholder="What can we help you with?"
              value={subject}
              onChangeText={setSubject}
            />
          </View>
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Message</Text>
            <TextInput
              className="bg-gray-50 p-4 rounded-lg"
              placeholder="Describe your issue..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity
            className="bg-primary py-4 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-semibold">Submit Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Resources */}
      <View className="p-4 mb-8">
        <Text className="text-lg font-bold mb-4">Additional Resources</Text>
        <View className="space-y-3">
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg">
            <Ionicons name="book" size={24} color="#007AFF" />
            <Text className="ml-3 flex-1">User Guide</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg">
            <Ionicons name="videocam" size={24} color="#007AFF" />
            <Text className="ml-3 flex-1">Video Tutorials</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg">
            <Ionicons name="newspaper" size={24} color="#007AFF" />
            <Text className="ml-3 flex-1">Blog & Updates</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}