export default async function auth({ username, password }) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_HOSTNAME}/login`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  console.log(response);

  if (response.status === 200) {
    const data = await response.json();
    return data.token
  }

  // Better error response and messaging in future
  if (response.status >= 400 && response.status < 599) {
    throw new Error(`Error state reached with login ${response.status}`)
  }
}
