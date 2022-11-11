import axios from 'axios';

export const baseURL = ' https://hacker-news.firebaseio.com/v0/';
export const newStoriesURL = `${baseURL}newstories.json`;
export const storyURL = `${baseURL}item/`;

export const getStoryIds = async () => {
  const result = await axios
    .get(newStoriesURL)
    .then(({ data }) => data)
    .catch(() => {
      throw new Error('Server error');
    });

  return result;
};

export const getStory = async (storyId: number) => {
  const result = await axios
    .get(`${storyURL + storyId}.json`)
    .then(({ data }) => data)
    .catch(() => {
      throw new Error('Server error');
    });

  return result;
};
