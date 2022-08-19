import instance from "./axios";

export const postingsAPI = { // FIXME: 이름 변경하기
    fetchPostingsListWithScroll: async (pageParams, category) => {
        const res = await instance.get(`/api/main/${category}?page=${pageParams}&size=5`);// FIXME: URL 바꾸기
        const { content } = res.data;
        const { last } = res.data;
        return { posts:content, nextPage: pageParams + 1, isLast:last}
    },
}

export const postings = {
    postPosting: async (newData) => {
        const res = await instance.post('/api/board', newData);
        return res.data;
    }
}
