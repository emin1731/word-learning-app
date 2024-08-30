import { useGetProfile } from "@/api/queries/user.queries";

export const ProfilePage = () => {
  const { data, isLoading, error } = useGetProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  // alert(accessToken);
  return <div>{JSON.stringify(data)} - success</div>;
};

// import { useAuthStore } from "@/store";
// import { useQuery } from "@tanstack/react-query";

// export const ProfilePage = () => {
//   const data = useAuthStore();

//   // Fetch user profile or other dependent data
//   const { isLoading, error } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () => {
//       return useAuthStore.getState().accessToken;
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading profile</div>;

//   return (
//     <div>
//       {data.refreshToken
//         ? `${data.refreshToken} - success`
//         : "No token available"}
//     </div>
//   );
// };
