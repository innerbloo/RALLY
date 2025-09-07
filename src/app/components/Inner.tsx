import { ReactNode } from 'react';

import styled from '@emotion/styled';

export default function Inner({ children }: { children: ReactNode }) {
    return <InnerContainer>{children}</InnerContainer>;
}

const InnerContainer = styled.div`
    padding: 2rem;
`;
