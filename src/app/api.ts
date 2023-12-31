import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, POSTS_BASE_URL } from "@/constants";
import type { LeaderboardData } from "./types/leaderboard";
import type {
  MappedMatchData,
  MatchQuery,
  MatchResponse,
} from "./types/matchHistory";
import type { PostData } from "./types/posts";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getLeaderboardByRegion: builder.query<LeaderboardData, string>({
      query: region => `/valorant/v2/leaderboard/${region}?start=1`,
    }),
    getUserMatchesByRegionAndName: builder.query<MappedMatchData[], MatchQuery>(
      {
        query: ({ region, name, tag }) =>
          `/valorant/v3/matches/${region}/${name}/${tag}`,
        transformResponse: (
          response: MatchResponse,
          _,
          arg: MatchQuery
        ): MappedMatchData[] => {
          const result = response.data.map(match => {
            const playerData = match.players.all_players?.filter(
              player => player.name === decodeURI(arg.name)
            )[0];
            const teamName = playerData.team.toLocaleLowerCase();
            const hasWon =
              match.teams[teamName]?.has_won ??
              teamName === match.rounds[0].winning_team;
            const { kills, deaths, assists } = playerData.stats;
            const kda = Math.round(((kills + assists) / deaths) * 100) / 100;
            const mappedMatch: MappedMatchData = {
              metadata: match.metadata,
              playerData,
              hasWon,
              kda,
            };

            return mappedMatch;
          });

          return result;
        },
      }
    ),
  }),
});

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: POSTS_BASE_URL }),
  endpoints: builder => ({
    getPosts: builder.query<PostData[], string>({
      query: page => `/posts?page=${page}&limit=5`,
    }),
    getPostsBySearchValue: builder.query<PostData[], string>({
      query: search => `posts?authorName=${search}&postContent=${search}`,
    }),
    getPostById: builder.query<PostData, string>({
      query: id => `posts/${id}`,
    }),
  }),
});

export const {
  useGetLeaderboardByRegionQuery,
  useGetUserMatchesByRegionAndNameQuery,
} = gameApi;

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsBySearchValueQuery,
} = postsApi;
