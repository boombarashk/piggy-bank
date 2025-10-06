export type TTabPage = {
  text: string;
  route: string;
};

export type TCategory = {
  id: string;
  name: string;
  color?: string;
};

export type TColor = Record<string, string>;

export type TFormFieldsExpense = {
  month: string;
  category: string;
  expense: string;
};

export type TExpense = Record<string, number>;

export type TNewExpense = {
  data: Record<string, TExpense>;
  month: number;
  year: string;
  categoryId: string;
  sum: number;
};

export type TData = {
  colors: Partial<TColor>;
  year: string;
  yearsCount: number;
  monthsCount: number;
  byMonths: TExpense;
  byCategories: Record<string, TExpense[]>;
  noEmptyCategories: Array<TCategory>;
};

export type TCategoriesState = {
  data: TCategory[];
  loaded: boolean;
};

export enum EntityEnum {
  "categories" = "categories",
  "expenses" = "expenses",
  "income" = "income",
}
