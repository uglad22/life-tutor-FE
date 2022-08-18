import React, { useContext } from 'react';
import { submitDataContext } from '../context/SubmitDataProvider';
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { postings } from '../../shared/api';


const PageTitle = ({ title, isAction }) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const context = useContext(submitDataContext);

    const { mutate:submitPosting, isError:mutateError } = useMutation(postings.postPosting, {
        onSuccess: ({data}) => {
            console.log(data);
            queryClient.invalidateQueries(["cardList", "postings"]);
            navigate('/home/postings');
        }
    });

    const postSubmitHandler = () => {
        //TODO: useMutation 사용해서 글 작성
        const {title, posting_content, hashtag} = context.state.postData;
        const newData = {
            title,
            posting_content,
            hashtag,
            imgUrl:'shdlfl'
        }
        console.log(newData);
        submitPosting(newData);
    }

    
    if(mutateError) return <p>error</p>
    if(pathname === '/home/postings') return <PageTitleEmpty/>;
    return(
        <PageTitleWrapper>
            <PageTitleContent>
                <div onClick={()=>navigate(-1)}><p><MdArrowBackIosNew/></p></div>
                <h2>{title}</h2>
                <HeaderActions isShow={isAction}>
                    {pathname==="/posting"?<p onClick={postSubmitHandler}>제출</p>:null}
                    {/* TODO: action이 필요한 페이지의 케이스를 위와 같이 다룸 */}
                </HeaderActions>
            </PageTitleContent>
        </PageTitleWrapper>
    )
}

export default PageTitle;

const PageTitleWrapper = styled.div`
    width:100%;
    max-width:480px;
    margin:0 auto;
    /* background:blue; */
    /* display:flex; */
    height:60px;
    border-bottom:1px solid lightgray;
    p {
        margin:0;
    }
`

const PageTitleContent = styled.div`
    width:calc(100% - 40px);
    margin:0 auto;
    /* background:red; */
    height:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    
`

const HeaderActions = styled.div`
    p {
        cursor:pointer;
    }
    ${props => {
            if(props.isShow === false) {
                return css`
                    visibility: hidden;
                `
            }
        }}
`

const PageTitleEmpty = styled.div`
    height:20px;
`