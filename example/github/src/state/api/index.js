const apiUrl = path =>
  `https://api.github.com/${path}access_token=3886b49a2e14a3bbb9f75b2a00211de53268729d`

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
