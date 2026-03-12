import { apiSlice } from "./apiSlice";

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  minimumStock: number;
  category: string;
  initialQuantity: number;
  unitPrice: number;
}

export const ingredientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<{ data: Ingredient[] }, void>({
      query: () => "/Ingredient",
      providesTags: ["Ingredients"],
    }),
    getLowStock: builder.query<{ data: Ingredient[] }, void>({
      query: () => "/Ingredient/low-stock",
      providesTags: ["Ingredients"],
    }),
    addIngredient: builder.mutation<any, Omit<Ingredient, 'id'>>({
      query: (body) => ({ url: "/Ingredient", method: "POST", body }),
      invalidatesTags: ["Ingredients"],
    }),
    addStock: builder.mutation<any, { id: string; amount: number }>({
      query: ({ id, amount }) => ({ 
        url: `/Ingredient/${id}/add-stock`, 
        method: "POST",
        body: { amount } 
      }),
      invalidatesTags: ["Ingredients"],
    }),
    useStock: builder.mutation<any, { id: string; amount: number }>({
      query: ({ id, amount }) => ({ 
        url: `/Ingredient/${id}/use-stock`, 
        method: "POST",
        body: { amount } 
      }),
      invalidatesTags: ["Ingredients"],
    }),
  }),
});

export const { 
  useGetIngredientsQuery, 
  useGetLowStockQuery, 
  useAddIngredientMutation, 
  useAddStockMutation, 
  useUseStockMutation 
} = ingredientApi;