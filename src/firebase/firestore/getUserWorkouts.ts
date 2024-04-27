import { getAllUserWorkouts } from "@/src/app/lib/actions/getAllUserWorkouts/getAllUserWorkouts";

// call server side api as we can get all subcollections only in node environment
// 
export default async function getUserWorkouts(id: string) {
  return await getAllUserWorkouts(id);
}
