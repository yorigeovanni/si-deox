import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRealImages, searchRealImages, uploadRealImage, RealImageSyncManager } from '../services/realImageService';
import { getNetworkState } from '../services/mockSocialService';

export function useRealImages(searchQuery = '') {
  const queryClient = useQueryClient();
  const isOffline = getNetworkState();
  
  // Use different query keys based on whether we're searching or not
  const queryKey = searchQuery ? ['realImages', 'search', searchQuery] : ['realImages'];
  
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => 
      searchQuery 
        ? searchRealImages(searchQuery, { pageParam }) 
        : fetchRealImages({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    networkMode: 'offlineFirst',
    // Add these options to prevent automatic fetching of all pages
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    // Only fetch the initial page automatically
    initialPageParam: 0
  });



  

  // Extract all images from all pages
  const allImages = data?.pages.flatMap(page => page.images) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;
  const isOfflineData = data?.pages[0]?.isOfflineData || false;

  // Custom refetch function that resets to the first page
  const refetchFromFirstPage = async () => {
    try {
      // Reset the query data completely
      queryClient.removeQueries({ queryKey });
      
      // Manually fetch just the first page
      const result = await (searchQuery 
        ? searchRealImages(searchQuery, { pageParam: 0 }) 
        : fetchRealImages({ pageParam: 0 }));
      
      // Set the query data with just the first page
      queryClient.setQueryData(queryKey, {
        pages: [result],
        pageParams: [0]
      });
      
      return result;
    } catch (error) {
      console.error('Error refreshing images:', error);
      throw error;
    }
  };

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadRealImage,
    onMutate: async (imageData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      const optimisticImage = {
        id: `temp-${Date.now()}`,
        url: imageData.uri,
        title: imageData.fileName || 'Uploading...',
        description: 'Image is being uploaded',
        tags: ['uploading'],
        uploadedAt: new Date().toISOString(),
        isUploaded: true,
        status: 'pending_sync',
        pendingUri: imageData.uri,
        isRealData: true
      };

      queryClient.setQueryData(queryKey, old => {
        if (!old || !old.pages || old.pages.length === 0) {
          return {
            pages: [{ images: [optimisticImage], nextPage: undefined, totalCount: 1 }],
            pageParams: [0]
          };
        }

        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              images: [optimisticImage, ...old.pages[0].images],
              totalCount: old.pages[0].totalCount + 1
            },
            ...old.pages.slice(1)
          ]
        };
      });

      return { previousData };
    },
    onError: (err, imageData, context) => {
      // Only revert if we're online - if offline, keep the optimistic update
      if (!isOffline) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    networkMode: 'offlineFirst',
    retry: isOffline ? false : 3 // Don't retry if offline
  });

  // Sync images when coming back online
  const syncImages = async () => {
    if (!isOffline) {
      await RealImageSyncManager.syncPendingUploads();
      queryClient.invalidateQueries({ queryKey: ['realImages'] });
    }
  };

  return {
    images: allImages,
    isLoading,
    error,
    refetch: refetchFromFirstPage, // Use our custom refetch function
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    totalCount,
    isOfflineData,
    uploadImage: uploadImageMutation.mutate,
    isUploading: uploadImageMutation.isPending,
    syncImages
  };
}