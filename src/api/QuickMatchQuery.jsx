import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

 
// http://3.15.208.183
export const QuickMatchApi = createApi({
  reducerPath: 'QuickMatchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.15.208.183/v2',
    
    prepareHeaders: (headers, {getState}) => {
      // const token = getState().access?.access_token;
      const token = import.meta.env.VITE_JWT ;

       if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['QuickMatch', 'points'],
  endpoints: builder => ({
    getMatchFormat: builder.query({
      query: selectPlayers => {
        return {
          url: `/quick-match/get-formats?players=${selectPlayers}`,
          method: 'GET',
        };
      },
    }),

    getQuickMatchId: builder.mutation({
      query: selectedFormat => {
        console.log(typeof selectedFormat.bowler_count, 'query');

        return {
          url: '/quick-match/create',
          method: 'POST',
          body: selectedFormat,
        };
      },
    }),

    getQuickMatchJoinedPlayer: builder.query({
      query: match_id => ({
        url: `quick-match/${match_id}/joined-players`,
        method: 'GET',
      }),
      invalidatesTags: (result, error, match_id) => [
        {type: 'QuickMatch', id: match_id},
      ],  
    }),

    confirmPlayerList: builder.mutation({
      query: playerList => {
        const {match_id, players} = playerList || {};
        return {
          url: `quick-match/${match_id}/confirm-player-list`,
          method: 'POST',
          body: players,
        };
      },
    }),

    quickMatchPossibleOptions: builder.query({
      query: match_id => {
        return {
          url: `quick-match/${match_id}/possible-options`,
          method: 'GET',
        };
      },
    }),

    joinQuickMatchPlayer: builder.mutation({
      query: match_id => ({
        url: `quick-match/${match_id}/join`,
        method: 'POST',
      }),
    }),

    startMatch: builder.mutation({
      query: ({match_id, data}) => {
        return {
          url: `quick-match/${match_id}/select-options`,
          method: 'POST',
          body: data,
        };
      },
    }),

    selectedPlayerList: builder.query({
      query: match_id => {
        return {
          url: `quick-match/${match_id}/preview`,
          method: 'GET',
        };
      },
    }),
    QuickstartMatch: builder.query({
      query: match_id => {
        return {
          url: `quick-match/${match_id}/start-match`,
          method: 'GET',
        };
      },
    }),

    quickMatchPoints: builder.mutation({
      query: data => {
        console.log(data);
        return {
          url: '/allocate-points',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response, meta) => {
        return {...response, statusCode: meta?.response?.status};
      },
      invalidatesTags: (result, error, {mid}) => [{type: 'points', id: mid}],
    }),
    getNextBallEvent: builder.query({
      query: matchId => {
        console.log('match_id-', matchId);
        return {
          url: `/get-next-ball-event?match_id=${matchId}`,
          providesTags: (result, error, matchId) => [
            {type: 'points', id: matchId},
          ],
        };
      },
      transformResponse: (response, meta) => {
        return { ...response, statusCode: meta?.response?.status };
      },
    }),

    getQuickMatchList: builder.query({
      query: () => ({
        url: 'quick-match/list',
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    
    matchLastBallHistory: builder.mutation({
      query: ({ match_id, over, ball, ball_event_number, evt }) => {
        // console.log("Query Params Sent:", { match_id, over, ball, ball_event_number, evt });
        return {
          url: '/undo-last-ball-event',
          method: "DELETE",
          params: { match_id, over, ball, ball_event_number, evt },
        }
      },
      transformResponse: (response, meta) => {
        return { ...response, statusCode: meta?.response?.status };
      },
    }),
    // viewerScoreCard:builder.query({
    //   query:(match_di) => {
    //     return{
    //       url:`${match_di}/viewer-start`,
    //       method:'GET',
    //       providesTags: (result, error, match_di) => [
    //         {type: 'points', id: match_di},
    //       ],
    //     }
    //   }
    // }),
    viewerScoreCard: builder.query({
      query: (match_id) => ({
        url: `${match_id}/viewer-start`,
        method: 'GET',
      }),
      providesTags: (result, error, match_id) => [
        { type: 'points', id: match_id },
      ],
    }),
    
    playerRetire: builder.mutation({
      query: (data) => {
        console.log("Call retire API:---",data);
        return {
          url: `/matches/${data?.mid}/players/${data?.player_id}/retire`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response, meta) => {
        return { ...response, statusCode: meta?.response?.status };
      },
    }),
    quickMatchLive:builder.query({
      query:() => ({
       url:'quick-match/live'
      }),
      keepUnusedDataFor: 0,
    })
  }),
});

export const {
  useGetMatchFormatQuery,
  useGetQuickMatchIdMutation,
  useGetQuickMatchJoinedPlayerQuery,
  useConfirmPlayerListMutation,
  useStartMatchMutation,
  useQuickMatchPossibleOptionsQuery,
  useSelectedPlayerListQuery,
  useQuickstartMatchQuery,
  useJoinQuickMatchPlayerMutation,
  useQuickMatchPointsMutation,
  useLazyGetNextBallEventQuery,
  useLazyGetQuickMatchListQuery,
  useMatchLastBallHistoryMutation,
  useViewerScoreCardQuery,
  useLazyQuickMatchLiveQuery,
 usePlayerRetireMutation
} = QuickMatchApi;
