import { shape, string, object, number, arrayOf, bool, func } from 'prop-types'

export const commitType = shape({
  title: string,
  author: object,
  date: string,
  sha: string,
  url: string,
})

export const commitListType = {
  commits: shape({
    fetching: bool,
    list: arrayOf(commitType),
  }),
  repository: string,
  username: string,
  getRepositoryCommits: func,
}

export const profileType = {
  user: shape({
    fetching: bool,
    name: string,
    bio: string,
    repos: number,
    followers: number,
    following: number,
    avatar: string,
  }),
  getUserProfile: func,
}

export const repositoryType = shape({
  id: number,
  name: string,
  stars: number,
})

export const repositoryListType = {
  repositories: shape({
    list: arrayOf(repositoryType),
    fetching: bool,
  }),
  getUserRepositories: func,
}
