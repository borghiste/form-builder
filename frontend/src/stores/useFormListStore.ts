import { create } from 'zustand';

type FormFieldRecord = {
    id: number;
    label: string;
    type: string;
    required: boolean;
    order?: number;
};

type FormRecord = {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    form_fields: FormFieldRecord[];
};

type FormListState = {
    forms: FormRecord[];
    selectedForm: FormRecord| null;
   
    getForms: () => Promise<void>;
    getFormById: (formId: number) => FormRecord;
};

export const useFormListStore = create<FormListState>((set, get) => ({
    forms: [],
    selectedForm: null,

    getForms: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch forms (${response.status})`);
            }

            const forms = (await response.json()) as FormRecord[];
            if (!Array.isArray(forms)) {
                throw new Error('The forms response is not an array');
            }

            set({ forms });
            
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    },

    getFormById: (formId: number) => {
        const selectedForm = get().forms.find((f) => f.id === formId);
        if (!selectedForm) {
            throw new Error(`Form with ID ${formId} not found`);
        }
        set({selectedForm});
        return selectedForm;
        
    }
}));
