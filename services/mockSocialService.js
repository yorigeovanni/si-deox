import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryClient } from './queryClient';
import { store } from '@/store';
import { setNetworkOnline, setNetworkOffline } from '../store/slices/deviceSlice';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    bio: 'Digital artist & photographer 📸',
    followers: 1234,
    following: 567,
    verified: true
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    bio: 'Travel enthusiast ✈️ | Food lover 🍜',
    followers: 892,
    following: 435,
    verified: false
  }
];

// Generate more mock posts for pagination testing
const generateMockPosts = (count = 50) => {
  const posts = [];
  const images = [
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1533050487297-09b450131914?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60'
  ];
  
  for (let i = 1; i <= count; i++) {
    posts.push({
      id: `${i}`,
      userId: i % 2 === 0 ? '2' : '1',
      contents: [
        { type: 'text', value: `This is post number ${i} with some interesting content! #post${i}` },
        { type: 'image', value: [images[i % images.length]] }
      ],
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      timestamp: new Date(Date.now() - (i * 3600000)).toISOString(),
      liked: i % 5 === 0
    });
  }
  
  return posts;
};

// In-memory posts storage
let MOCK_POSTS = generateMockPosts(50);

// Network state management using Redux
let networkStateListeners = [];

// Storage keys
const STORAGE_KEYS = {
  POSTS: 'localPosts',
  NETWORK: 'networkState'
};

// Initialize storage
const initializeStorage = async () => {
  try {
    // Load network state
    const storedNetworkState = await AsyncStorage.getItem(STORAGE_KEYS.NETWORK);
    if (storedNetworkState !== null) {
      const isOffline = JSON.parse(storedNetworkState);
      if (isOffline) {
        store.dispatch(setNetworkOffline());
      } else {
        store.dispatch(setNetworkOnline());
      }
    }

    // Load posts
    const storedPosts = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
    if (storedPosts) {
      MOCK_POSTS = JSON.parse(storedPosts);
    } else {
      // Save initial posts if none exist
      await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(MOCK_POSTS));
    }
  } catch (error) {
    //console.error('Failed to initialize storage:', error);
  }
};

// Save posts to storage
const persistPosts = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(MOCK_POSTS));
  } catch (error) {
    //console.error('Failed to persist posts:', error);
  }
};

// Network state management
export const toggleOfflineMode = async (newOfflineState) => {
  try {
    if (newOfflineState) {
      store.dispatch(setNetworkOffline());
    } else {
      store.dispatch(setNetworkOnline());
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.NETWORK, JSON.stringify(newOfflineState));
    
    // If coming back online, process pending mutations
    if (!newOfflineState) {
      SyncManager.syncPendingChanges();
    }
    
    networkStateListeners.forEach(listener => listener(newOfflineState));
    return newOfflineState;
  } catch (error) {
    //console.error('Failed to persist network state:', error);
    return getNetworkState();
  }
};

export const getNetworkState = () => {
  const networkStatus = store.getState().device?.networkStatus;
  return networkStatus === 'offline';
};

export const addNetworkStateListener = (listener) => {
  networkStateListeners.push(listener);
  return () => {
    networkStateListeners = networkStateListeners.filter(l => l !== listener);
  };
};

// Simulate network delay
const simulateNetworkConditions = async () => {
  if (getNetworkState()) {
    throw new Error('No internet connection');
  }
  await new Promise(resolve => setTimeout(resolve, 500));
};

// API functions with pagination
export const fetchPosts = async ({ pageParam = 0 }) => {
  try {
    if (!getNetworkState()) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const sortedPosts = [...MOCK_POSTS].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const PAGE_SIZE = 20;
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedPosts = sortedPosts.slice(start, end);
    const hasNextPage = end < sortedPosts.length;
    
    return {
      posts: paginatedPosts,
      users: MOCK_USERS.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
      nextPage: hasNextPage ? pageParam + 1 : undefined,
      totalCount: sortedPosts.length
    };
  } catch (error) {
    // Return cached data when offline
    const sortedPosts = [...MOCK_POSTS].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const PAGE_SIZE = 20;
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedPosts = sortedPosts.slice(start, end);
    const hasNextPage = end < sortedPosts.length;
    
    return {
      posts: paginatedPosts,
      users: MOCK_USERS.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
      nextPage: hasNextPage ? pageParam + 1 : undefined,
      totalCount: sortedPosts.length
    };
  }
};

export const createPost = async (contents) => {
  // Directly create post regardless of network state
  const newPost = {
    id: Date.now().toString(),
    userId: '1', // Assuming current user
    contents,
    likes: 0,
    comments: 0,
    shares: 0,
    timestamp: new Date().toISOString(),
    liked: false,
    status: getNetworkState() ? 'pending_sync' : 'synced'
  };

  MOCK_POSTS = [newPost, ...MOCK_POSTS];
  await persistPosts();
  
  // If offline, we'll mark it for sync later
  if (getNetworkState()) {
    //console.log('Created post in offline mode, will sync later');
  } else {
    // Simulate API call if online
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return newPost;
};

export const updatePost = async (postId, contents) => {
  // Directly update post regardless of network state
  const updatedPost = {
    ...MOCK_POSTS.find(post => post.id === postId),
    contents,
    timestamp: new Date().toISOString(),
    status: getNetworkState() ? 'pending_sync' : 'synced'
  };

  MOCK_POSTS = MOCK_POSTS.map(post => 
    post.id === postId ? updatedPost : post
  );

  await persistPosts();
  
  // If offline, we'll mark it for sync later
  if (getNetworkState()) {
    //console.log('Updated post in offline mode, will sync later');
  } else {
    // Simulate API call if online
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return updatedPost;
};

export const likePost = async (postId) => {
  // Directly like post regardless of network state
  let updatedPost;
  MOCK_POSTS = MOCK_POSTS.map(post => {
    if (post.id === postId) {
      updatedPost = {
        ...post,
        liked: !post.liked,
        likes: post.liked ? post.likes - 1 : post.likes + 1,
        status: getNetworkState() ? 'pending_sync' : 'synced'
      };
      return updatedPost;
    }
    return post;
  });

  await persistPosts();
  
  // If offline, we'll mark it for sync later
  if (getNetworkState()) {
    //console.log('Liked post in offline mode, will sync later');
  } else {
    // Simulate API call if online
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return { success: true, post: updatedPost };
};

// SyncManager for handling offline-to-online synchronization
export class SyncManager {
  static async syncPendingChanges() {
    const pendingQueries = queryClient.getQueriesData({
      predicate: (query) => {
        const data = query.state.data;
        return data && data.pages && data.pages.some(page => 
          page.posts && page.posts.some(post => post.status === 'pending_sync')
        );
      }
    });

    for (const [queryKey, data] of pendingQueries) {
      if (data && data.pages) {
        // Find all pending posts across all pages
        const pendingPosts = [];
        data.pages.forEach(page => {
          if (page.posts) {
            const pagePendingPosts = page.posts.filter(post => post.status === 'pending_sync');
            pendingPosts.push(...pagePendingPosts);
          }
        });
        
        for (const post of pendingPosts) {
          try {
            // Update the post status in our mock database
            MOCK_POSTS = MOCK_POSTS.map(p => 
              p.id === post.id ? { ...p, status: 'synced' } : p
            );
            
            // Update the query data to reflect the synced status
            queryClient.setQueryData(queryKey, old => {
              return {
                ...old,
                pages: old.pages.map(page => ({
                  ...page,
                  posts: page.posts.map(p => 
                    p.id === post.id ? { ...p, status: 'synced' } : p
                  )
                }))
              };
            });
            
            await persistPosts();
            //console.log(`Synced post ${post.id}`);
          } catch (error) {
            //console.error(`Failed to sync post ${post.id}:`, error);
          }
        }
      }
    }
  }
}

// Initialize storage on module load
initializeStorage();