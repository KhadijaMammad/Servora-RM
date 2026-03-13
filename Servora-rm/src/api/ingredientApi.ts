import { apiSlice } from "./apiSlice";

export interface Ingredient {
  id: string;
  name: string;      // "Name" yox, "name"
  unit: string;      // "Unit" yox, "unit"
  minimumStock: number;
  category: string;  // "Category" yox, "category"
  initialQuantity: number;
  unitPrice: number;
}

export const ingredientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<{ data: Ingredient[] }, void>({
      query: () => "/Ingredient",
      providesTags: ["Ingredients"],
    }),
    addIngredient: builder.mutation<any, FormData>({
      query: (formData) => ({ 
        url: "/Ingredient", 
        method: "POST", 
        body: formData, // Burada birbaşa FormData göndəririk
      }),
      invalidatesTags: ["Ingredients"],
    }),
    addStock: builder.mutation<any, { id: string; amount: number }>({
      query: ({ id, amount }) => {
        const formData = new FormData();
        formData.append("amount", amount.toString()); // FormData formasına salırıq
        return { 
          url: `/Ingredient/${id}/add-stock`, 
          method: "POST",
          body: formData 
        };
      },
      invalidatesTags: ["Ingredients"],
    }),
    useStock: builder.mutation<any, { id: string; amount: number }>({
      query: ({ id, amount }) => {
        const formData = new FormData();
        formData.append("amount", amount.toString());
        return { 
          url: `/Ingredient/${id}/use-stock`, 
          method: "POST",
          body: formData 
        };
      },
      invalidatesTags: ["Ingredients"],
    }),
  }),
});

export const { useGetIngredientsQuery, useAddIngredientMutation, useAddStockMutation, useUseStockMutation } = ingredientApi;