import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ManagementCard = ({isShow, svg, managementType, pathUrl}) => {
  const navigate = useNavigate();
  return (
    <>
        <ManagementWrapper isShow={isShow} onClick={() => {navigate(pathUrl)}}>
            {svg}
            <p>{managementType}</p>
        </ManagementWrapper>
    </>
  )
}

export default ManagementCard

const ManagementWrapper = styled.div`
    display: ${(props) => (props.isShow ? "flex" : "none")};
    padding: 20px;
    color: #656565;
    gap: 20px;
    border-bottom: 1px solid #E6E6E6;
    cursor: pointer;
`;