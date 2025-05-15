import { ref } from "vue";

export const existingShowList = ref([]);

export const currentShow = ref({
    title: undefined,
    episode: undefined,
    status: undefined,
    notes: undefined
});

const newShow = ref({
    id: undefined,
    title: undefined,
    episode: undefined,
    status: undefined,
    notes: undefined
});

export const resetNewShow = () => {
    newShow.value = {
        id: undefined,
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
};

export const resetCurrentShow = () => {
    currentShow.value = {
        title: undefined,
        episode: undefined,
        status: undefined,
        notes: undefined
    };
};