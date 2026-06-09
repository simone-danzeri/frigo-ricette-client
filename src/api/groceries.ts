import api from "./client";
import { type Grocery } from "../types";

export const getGroceries = () =>
    api.get<Grocery[]>("/groceries").then(res => res.data);

export const markAsBought = (ingredientId: number) =>
    api.post(`/groceries/${ingredientId}/bought`);

export const removeFromGrocery = (ingredientId: number) =>
    api.delete(`/groceries/${ingredientId}`);