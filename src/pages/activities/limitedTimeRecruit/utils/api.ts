import { http } from "@/utils/http";
import { CategoryOption, Goods } from "./type";

export const getCategoryOptions = async (): Promise<CategoryOption[]> =>
  await http("limited_time_recruit/category_options");

export const getGoodsList = async (categoryId: number): Promise<Goods[]> =>
  await http("limited_time_recruit/goods_list", { data: { categoryId } });
