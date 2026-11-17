import {create} from 'zustand';

type dataEntry = {
    fieldId: string;
    value: any;
}

type Entry = {
    id: number;
    status: string;
    data : dataEntry[];
}

type EntriesState = {
entries : Entry[];
getEntries : () => Promise<void>;
 insertNewEntry: (formId: number, newEntry: dataEntry[]) => Promise<void>;
}

export const useEntriesStore = create<EntriesState>((set, get) => ({
entries: [],
getEntries: async () => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/forms/entries`,
        {method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Unable to retrieve entries'
        );
        
    }
    const data = await response.json();
    set({entries: data});

},

insertNewEntry: async (newEntry) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/entries/submit`,
        {method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry),
        }
    );

    if(!response.ok) {
        throw new Error('Unable to submit entry');
    
    }
    const data = await response.json();
}

}))
