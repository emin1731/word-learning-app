import { useGetProfile } from "@/api/queries/user.queries";

export const ProfilePage = () => {
  const { data, isLoading, error } = useGetProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  // alert(accessToken);
  return <div>{JSON.stringify(data)} - success</div>;
};
