import { http } from "@/utils/http";

export interface ExpressOption {
  id: number;
  code: string;
  name: string;
}

export interface FreightTemplateListItem {
  id: number;
  name: string;
}

export const getExpressOptions = async (): Promise<ExpressOption[]> =>
  await http("shop/express_options");

export const getFreightTemplateList = async (
  page = 1,
  limit = 10
): Promise<FreightTemplateListItem[]> => {
  const { list = [] } =
    (await http("shop/freight_template/list", { data: { page, limit } })) || {};
  return list;
};

interface AreaItem {
  id: number;
  pickedCityCodes: string[];
  pickedCityDescs: string[];
  fee: number;
}
interface ExpressItem {
  id: number;
  pickedExpressCodes: string[];
  pickedExpressDescs: string[];
  fee: number;
}
interface ExpressTemplate {
  id: number;
  areaName: string;
  computeMode: number;
  baseFee?: number;
  stepFee?: number;
  singleFee?: number;
  freeQuota: number;
  pickedCityCodes: string[];
  pickedCityDescs: string[];
}
interface ExpressTemplateList {
  expressCode: string;
  expressName: string;
  list: ExpressTemplate[];
}
export interface FreightTemplate {
  mode: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number;
  areaList: AreaItem[];
  expressList: ExpressItem[];
  expressTemplateLists: ExpressTemplateList[];
}

interface AddFreightTemplate
  extends Omit<
    FreightTemplate,
    "areaList" | "expressList" | "expressTemplateLists"
  > {
  areaList: string;
  expressList: string;
  expressTemplateLists: string;
}

interface EditFreightTemplate extends AddFreightTemplate {
  id: number;
}

export const getFreightTemplate = async (
  id: number
): Promise<FreightTemplate> =>
  await http("shop/freight_template/detail", { data: { id } });

export const createFreightTemplate = async (
  freightTemplate: AddFreightTemplate
) =>
  await http("shop/freight_template/add", {
    method: "POST",
    data: freightTemplate,
  });

export const editFreightTemplate = async (
  freightTemplate: EditFreightTemplate
) =>
  await http("shop/freight_template/edit", {
    method: "POST",
    data: freightTemplate,
  });

export const deleteFreightTemplate = async (id: number) =>
  await http("shop/freight_template/delete", { method: "POST", data: { id } });
