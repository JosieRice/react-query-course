import axios from "axios";
import { useQuery } from "react-query";

function fetchUser(username: string) {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then((res) => res);
}

interface Props {
  username: string;
}

const GitHubUser = ({ username }: Props) => {
  const userQuery = useQuery([username], () => fetchUser(username));

  const data = userQuery.data;

  if (userQuery.isLoading) {
    return <div>...</div>;
  }

  if (userQuery.isError) {
    return <div>{(userQuery as any).error.message}</div>;
  }

  return <div>{JSON.stringify(data, null, 4)}</div>;
};

export default GitHubUser;
