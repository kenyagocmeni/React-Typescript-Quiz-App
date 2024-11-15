// api.ts
import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php'; // Open Trivia Database API URL

interface FetchQuestionsParams {
    amount: number;
    category?: string;
    difficulty?: string;
}

export const fetchQuestions = async ({ amount, category, difficulty }: FetchQuestionsParams) => {
    try {
        const params = new URLSearchParams({
            amount: amount.toString(),
            ...(category && { category }), // Kategori seçilmişse parametreye ekle
            ...(difficulty && { difficulty }) // Zorluk seçilmişse parametreye ekle
        });

        const response = await axios.get(`${API_URL}?${params.toString()}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
};
