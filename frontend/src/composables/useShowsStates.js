import { ref } from "vue";

export function useShowsStates () {
    const existingShowList = ref([]);

    const currentShow = ref({
        id: undefined,
        title: undefined,
        episode: undefined,
        season: undefined,
        status: undefined,
        notes: undefined
    });

    const newShow = ref({
        id: undefined,
        title: undefined,
        episode: undefined,
        season: undefined,
        status: undefined,
        notes: undefined
    });

    const resetNewShow = () => {
        newShow.value = {
            id: undefined,
            title: undefined,
            episode: undefined,
            season: undefined,
            status: undefined,
            notes: undefined
        };
    };

    const resetCurrentShow = () => {
        currentShow.value = {
            title: undefined,
            episode: undefined,
            season: undefined,
            status: undefined,
            notes: undefined
        };
    };

    return {
        existingShowList,
        currentShow,
        newShow,

        // reset functions
        resetNewShow,
        resetCurrentShow
    }

}