import React from 'react';
import styled from 'styled-components';

const ManagementCard = ({svg, managementType}) => {
  return (
    <>
        <ManagementWrapper>
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