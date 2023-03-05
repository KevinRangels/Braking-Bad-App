import type { Result } from "@/characters/interfaces/character"

interface Store {
    characters: {
        list: Result[],
        count: number,
        isLoading: boolean,
        hasErro: boolean,
        errorMessage: string | null
    },
    // Metodos
    startLoadingCharacters: () => void,
    loadedCharacters: (data: Result[]) => void,
    loadedCharactersFailed: (error: string) => void
}