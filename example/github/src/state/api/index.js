const token = '3removemef468c9b91a00d81removeme99ed59caed951926637d9e6b'
const accessToken = token.replace(/removeme/g, '')

const apiUrl = path =>
  `https://api.github.com/${path}access_token=${accessToken}`

export const getUser = {
  name: 'getUser',
  options: ({ userName }) => ({
    payload: apiUrl(`users/${userName}?`),
  }),
  serialize: data => ({
    username: data.login,
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    url: data.html_url,
    followers: data.followers,
    following: data.following,
    repos: data.public_repos,
  }),
}

export const getRepos = {
  name: 'getRepos',
  options: ({ userName }) => ({
    payload: apiUrl(`users/${userName}/repos?sort=updated&`),
  }),
  serialize: repos =>
    repos
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        description: repo.description,
        url: repo.html_url,
      }))
      .sort((a, b) => b.stars - a.stars),
}

export const getCommits = {
  name: 'getCommits',
  options: ({ userName, repo, page = 1 }) => ({
    payload: apiUrl(`repos/${userName}/${repo}/commits?page=${page}&`),
  }),
  serialize: commits =>
    commits.map(commit => ({
      sha: commit.sha,
      title: commit.commit.message,
      author: commit.author,
      date: commit.commit.author.date,
      url: commit.html_url,
    })),
}
