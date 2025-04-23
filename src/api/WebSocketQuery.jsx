import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const WebSocketApi = createApi({
  reducerPath: 'webSocketApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.15.208.183/v2',
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().access?.access_token;
      const token = import.meta.env.VITE_JWT ;

      // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTVlNTFkYy1iZDFmLTRlYzEtYWRiZi01MzlmMGY2M2Y0MjAiLCJleHAiOjE3NDU1OTE3MjF9.KhjbZWpICkwED85VqMTRN5KDDpjnJSdIx43ItnwQMbM"

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLiveScore: builder.query({
      queryFn: () => ({ data: 'loading' }),
      keepUnusedDataFor: 60,
      async onCacheEntryAdded(
        matchId,
        { updateCachedData, cacheEntryRemoved }
      ) {
        // const token = getState().access?.access_token;
        // if (!token) return;

        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNTVlNTFkYy1iZDFmLTRlYzEtYWRiZi01MzlmMGY2M2Y0MjAiLCJleHAiOjE3NDU1OTE3MjF9.KhjbZWpICkwED85VqMTRN5KDDpjnJSdIx43ItnwQMbM"


        let ws;
        let manuallyClosed = false;
        let isConnected = navigator.onLine;
        let reconnectTimeout;
        let reconnectDelay = 3000;

        const connectWebSocket = async () => {
          if (!isConnected || manuallyClosed) return;

          console.log(`Connecting WebSocket...`, token);

          ws = new WebSocket(
            `ws://3.15.208.183:8000/v2/ws/matches/${matchId}/live-points?token=${token}`
          );

          ws.onopen = async () => {
            console.log('WebSocket Connected');
            reconnectDelay = 3000;

            try {
              const response = await fetch(
                `http://3.15.208.183/v2/send-initial-data/${matchId}`,
                {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (!response.ok) {
                console.error('Initial data fetch failed');
              }
            } catch (err) {
              console.error('Initial data fetch error:', err);
            }
          };

          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              updateCachedData(() => data);
            } catch (err) {
              console.error('WebSocket message parse error:', err);
            }
          };

          ws.onerror = (err) => {
            console.error('WebSocket Error:', err.message);
          };

          ws.onclose = () => {
            console.warn('WebSocket Disconnected');
            if (!manuallyClosed && isConnected) {
              scheduleReconnect();
            }
          };
        };

        const scheduleReconnect = () => {
          if (reconnectTimeout || manuallyClosed) return;

          reconnectTimeout = setTimeout(() => {
            console.log(
              `Reconnecting WebSocket after ${reconnectDelay / 1000}s...`
            );
            connectWebSocket();
            reconnectTimeout = null;
            reconnectDelay = Math.min(reconnectDelay * 2, 30000);
          }, reconnectDelay);
        };

        const handleOnline = () => {
          const justReconnected = !isConnected && navigator.onLine;
          isConnected = navigator.onLine;

          if (
            justReconnected &&
            !manuallyClosed &&
            (!ws || ws.readyState === WebSocket.CLOSED)
          ) {
            console.log('Network reconnected');
            reconnectDelay = 3000;
            connectWebSocket();
          }
        };

        const handleOffline = () => {
          isConnected = false;
          console.log('Network went offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        connectWebSocket();

        await cacheEntryRemoved;
        manuallyClosed = true;

        if (ws) ws.close();
        if (reconnectTimeout) clearTimeout(reconnectTimeout);

        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);

        console.log('WebSocket cleanup complete');
      },
    }),
  }),
});

export const { useGetLiveScoreQuery } = WebSocketApi;
