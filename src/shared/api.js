import instance from "./axios";

export const postingsAPI = { // FIXME: 이름 변경하기
    fetchPostingsListWithScroll: async (pageParams) => {
        const res = await instance.get(`/api/main/postings?page=${pageParams}&size=10`);// FIXME: URL 바꾸기
        const { content } = res.data;
        const { last } = res.data;
        return { posts:content, nextPage: pageParams + 1, isLast:last};
    },
    postPosting: async (newData) => {
        const res = await instance.post('/api/board', newData);
        return res.data;
    },
    postEditing: async ({ postingId, newData}) => {
        console.log(postingId, newData);
        await instance.put(`/api/board/${postingId}`, newData)
    },
    postDelete: async (postingId) => {
        await instance.delete(`/api/board/${postingId}`);
    }
}

export const chatroomAPI = {
    createChatRoom: async (param) => {
        const { title, hashtag } = param;
        const newData = {title, hashtag};
        console.log(newData);
        const res = await instance.post('api/chat/room', newData);
        return res.data;
    },
    fetchRoomsListWithScroll: async (pageParams) => {
        const res = await instance.get(`/api/main/rooms?page=${pageParams}&size=10`);
        const { content } = res.data;
        const { isLast } = res.data;
        return { rooms:content, nextPage: pageParams + 1, isLast};
    }
}
