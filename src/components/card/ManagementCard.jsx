import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ManagementCard = ({svg, managementType, pathUrl}) => {
  const navigate = useNavigate();
  return (
    <>
        <ManagementWrapper onClick={() => {navigate(pathUrl)}}>
            {svg}
            <p>{managementType}</p>
        </ManagementWrapper>
    </>
  )
}

export default ManagementCard

const ManagementWrapper = styled.div`
    display: flex;
    padding: 20px;
    color: #656565;
    gap: 20px;
    border-bottom: 1px solid #E6E6E6;
`;