import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory-native';

const reportCategories = [
  {
    id: '1',
    name: 'Project Overview',
    icon: 'stats-chart',
    color: '#4CAF50',
    description: 'Overall project status and metrics'
  },
  {
    id: '2',
    name: 'Task Analysis',
    icon: 'checkbox',
    color: '#2196F3',
    description: 'Task completion and distribution'
  },
  {
    id: '3',
    name: 'Resource Utilization',
    icon: 'people',
    color: '#9C27B0',
    description: 'Team workload and allocation'
  },
  {
    id: '4',
    name: 'Budget Tracking',
    icon: 'cash',
    color: '#FF9800',
    description: 'Financial performance and costs'
  }
];

const taskStatusData = [
  { x: 'Completed', y: 45 },
  { x: 'In Progress', y: 30 },
  { x: 'Pending', y: 15 },
  { x: 'Blocked', y: 10 }
];

const progressData = [
  { x: 'Week 1', y: 15 },
  { x: 'Week 2', y: 28 },
  { x: 'Week 3', y: 42 },
  { x: 'Week 4', y: 58 },
  { x: 'Week 5', y: 72 },
  { x: 'Week 6', y: 85 }
];

const resourceUtilization = [
  { x: 'Development', y: 85 },
  { x: 'Design', y: 75 },
  { x: 'Testing', y: 60 },
  { x: 'Management', y: 90 }
];

export default function ReportsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <LinearGradient
          colors={['#009688', '#00796B']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <TouchableOpacity 
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Reports</Text>
            <Text className="text-white/80">Project analytics and insights</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Progress</Text>
              <Text className="text-2xl font-bold">85%</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">On Track</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Tasks</Text>
              <Text className="text-2xl font-bold">45/60</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">75% Done</Text>
              </View>
            </View>
          </View>

          {/* Project Progress */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Project Progress</Text>
            <VictoryChart
              theme={VictoryTheme.material}
              height={200}
              padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `${t}%`}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryLine
                data={progressData}
                style={{
                  data: { stroke: "#009688" }
                }}
              />
            </VictoryChart>
          </View>

          {/* Task Status Distribution */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Task Status</Text>
            <View style={{ height: 200 }}>
              <VictoryPie
                data={taskStatusData}
                colorScale={['#4CAF50', '#2196F3', '#FFC107', '#F44336']}
                radius={({ datum }) => 80}
                innerRadius={40}
                labelRadius={({ innerRadius }) => (innerRadius || 0) + 30}
                style={{
                  labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' }
                }}
              />
            </View>
          </View>

          {/* Resource Utilization */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Resource Utilization</Text>
            <VictoryChart
              theme={VictoryTheme.material}
              height={200}
              padding={{ top: 20, bottom: 40, left: 100, right: 20 }}
              domainPadding={20}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `${t}%`}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryBar
                horizontal
                data={resourceUtilization}
                style={{
                  data: { fill: "#009688" }
                }}
              />
            </VictoryChart>
          </View>

          {/* Report Categories */}
          <View className="flex-row flex-wrap justify-between">
            {reportCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="bg-white rounded-xl w-[48%] p-4 mb-4 shadow-sm"
              >
                <View 
                  className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <Text className="font-semibold mb-1">{category.name}</Text>
                <Text className="text-gray-600 text-sm">{category.description}</Text>
                <View className="flex-row items-center mt-3">
                  <Text className="text-primary font-semibold">View Report</Text>
                  <Ionicons name="chevron-forward" size={16} color="#009688" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Export Options */}
          <View className="bg-white rounded-xl p-4 shadow-sm mt-2">
            <Text className="text-lg font-bold mb-4">Export Options</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity className="flex-1 bg-primary/10 py-3 rounded-lg mr-2">
                <View className="flex-row items-center justify-center">
                  <Ionicons name="document" size={20} color="#009688" />
                  <Text className="text-teal-600 font-semibold ml-2">PDF</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary/10 py-3 rounded-lg ml-2">
                <View className="flex-row items-center justify-center">
                  <Ionicons name="calculator" size={20} color="#009688" />
                  <Text className="text-teal-600 font-semibold ml-2">Excel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}