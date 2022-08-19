import React, { useContext } from 'react';
import { submitDataContext } from '../context/SubmitDataProvider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const DeletableBadge = ({ children, idx }) => {
    const context = useContext(submitDataContext);
    const { postData } = context.state;
    const { setPostData } = context.actions;
    const handleDelete = () => {
        let tempHashtag = [...postData.hashtag];
        tempHashtag.splice(idx, 1);
        console.log(tempHashtag);
        setPostData({...postData, hashtag:[...tempHashtag]});
        // console.log(postData);
        // alert(idx);
      };
    
      return (
        <Stack direction="row" spacing={1} >
          <Chip label={ children } onDelete={handleDelete} sx={{background:"#DFE2FF"}}/>
        </Stack>
      );
}

export default DeletableBadge;