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

export type TFormFieldsIncome = {
  month: string;
  sum: string;
};

export type TFormFieldsExpense = {
  month: string;
  category: string;
  expense: string;
};

export type TIncome = Record<string, number>;
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
  incomesByMonths: TIncome;
  expensesByMonths: TExpense;
  expensesByCategories: Record<string, TExpense[]>;
  noEmptyCategories: Array<TCategory>;
};

export type TCategoriesState = {
  data: TCategory[];
  loading: boolean;
};

export type TIncomesState = Record<string, TIncome> & {
  loading: boolean;
};

export enum EntityEnum {
  "categories" = "categories",
  "expenses" = "expenses",
  "incomes" = "incomes",
}
