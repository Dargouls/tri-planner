import { create } from 'zustand';

interface RecipesStore {
	openRecipes: boolean;
	setOpenRecipes: (open: boolean) => void;
}
interface IngredientsStore {
	ingredients: string[];
	setIngredients: (ingredients: string[]) => void;
	addIngredient: (ingredient: string) => void;
	removeIngredient: (ingredient: string) => void;
}
interface NotesStore {
	notes: string[];
	setNotes: (notes: string[]) => void;
	addNote: (note: string) => void;
	removeNote: (note: string) => void;
}

const useRecipesStore = create<IngredientsStore & NotesStore & RecipesStore>((set, get) => ({
	ingredients: [],
	setIngredients: (ingredients) => set({ ingredients }),
	addIngredient: (ingredient) => set({ ingredients: [...get().ingredients, ingredient] }),
	removeIngredient: (ingredient) =>
		set((state) => ({
			ingredients: state.ingredients.filter((item) => item !== ingredient),
		})),

	notes: [],
	addNote: (note) => set({ notes: [...get().notes, note] }),
	setNotes: (notes) => set({ notes }),
	removeNote: (note) => set((state) => ({ notes: state.notes.filter((item) => item !== note) })),
	openRecipes: false,
	setOpenRecipes: (open) => set({ openRecipes: open }),
}));

export { useRecipesStore };
