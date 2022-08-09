import instance from "./axios";

export const postingsAPI = {
    fetchPostingsList: () => {
        return instance.get('/apimainpostings') // FIXME: URL 바꾸기
    },
}

export const roomsAPI = {
    fetchRoomsList: () => {
        return instance.get('/apimainrooms') // FIXME: URL 바꾸기
    }
}