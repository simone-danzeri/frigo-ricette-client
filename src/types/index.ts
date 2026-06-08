export interface Ingredient {
    id: number,
    name: string,
    slug: string,
    quantity: number,
    isAvailable: boolean,
    createdAt: string,
    updatedAt: string
}

export interface Recipe {
    id: number,
    name: string,
    process: string,
    ingredients: Ingredient[],
    createdAt: string,
    updatedAt: string
}

export interface Grocery {
    id: number,
    ingredient: Ingredient
    quantity: number,
    createdAt: string,
    updatedAt: string
}