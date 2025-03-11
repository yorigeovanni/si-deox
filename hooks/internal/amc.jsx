import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from './api'



export const unicKeys = {
  all: () => ['amc'],
  list: () => [...unicKeys.all(), 'list'],
  details: () => [...unicKeys.all(), 'detail'],
  detail: (id) => [...unicKeys.details(), id],
}



export const useMovie = (movieId) => {
  const queryClient = useQueryClient()

  const movieQuery = useQuery({
    queryKey: unicKeys.detail(movieId),
    queryFn: () => api.fetchMovie(movieId),
  })



  return {
    comment: comment ?? movieQuery.data?.movie.comment,
    setComment,
    updateMovie,
    movieQuery,
  }
}
