

import { useRouter } from "next/navigation";

export const useExistingClasses = ({ existingClasses, newClasses }: { existingClasses: string, newClasses: string | undefined }) => {
  if (newClasses?.includes("useExistingClasses")) {
    return existingClasses + " " + newClasses;
  }
  if(newClasses){
    return newClasses;
  }
  return existingClasses;
}
export const useRouteTo = () => {
  const router = useRouter();

  return (path: string) => {
    router.push(path);
  };
};