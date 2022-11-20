export type IStoryIdsState = {
  storyIds: Array<number>;
  isLoaded: string;
  error: null | string;
};

export type IStory = {
  by: string;
  descendants: number;
  id: number;
  kids?: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type IStoriesState = {
  stories: IStory[];
  isLoaded: string;
  error: string;
};

export type IComment = {
  by: string;
  id: number;
  kids: Array<number>;
  parent: number;
  text: string;
  time: number;
  type: string;
};

export type ICommentState = {
  comments: IComment[];
  isLoaded: string;
  error: string;
};
