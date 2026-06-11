import api from "./client";
import type { Ingredient } from "../types";

export const getIngredients = () =>
    api.get<Ingredient[]>("/ingredients").then(res => res.data);

export const createIngredient = (data: {name: string; quantity: number; isAvailable: boolean}) =>
    api.post<Ingredient>("/ingredients", data).then(res => res.data);

export const updateIngredient = (id: number, data: {name: string; quantity: number; isAvailable: boolean}) =>
    api.put<Ingredient>(`/ingredients/${id}`, data).then(res => res.data);

export const deleteIngredient = (id: number) =>
    api.delete<Ingredient>(`/ingredients/${id}`)

export const addToGrocery = (id: number) =>
    api.post<Ingredient>(`/greoceries/${id}`).then(res => res.data);

export const removeFromGrocery = (id: number) =>
    api.delete<Ingredient>(`/ingredients/${id}`)