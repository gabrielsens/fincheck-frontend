import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../service/categoriesService";

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories', 'all'],
    queryFn: categoriesService.getAll
  });
  return {
    categories: data ?? [],
    isFetching
  }
}
