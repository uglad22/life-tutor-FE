import React, { useState, createContext} from 'react';

export const submitDataContext = createContext();

const SubmitDataProvider = ({ children }) => {
    const [postData, setPostData] = useState({
        title:'',
        posting_content:'',
        hashtag:[],
    });

    const value = {
        state: { postData },
        actions: { setPostData }
    }

    return (<submitDataContext.Provider value={value}>{ children }</submitDataContext.Provider>)
}

export default SubmitDataProvider;