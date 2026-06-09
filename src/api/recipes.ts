import api from "./client";
import { type Recipe } from "../types";

export const getRecipes = () =>
    api.get<Recipe[]>("/recipes").then(res => res.data);

export const createRecipe = (data: {name: string; process: string; ingredientsIds: number[]}) =>
    api.post<Recipe>("/recipes", data).then(res => res.data);

export const deleteRecipe = (id: number) =>
    api.delete<Recipe>(`/recipes/${id}`)

export const cookRecipe = (id: number) =>
    api.post<Recipe>(`/recipes/${id}/cook`)