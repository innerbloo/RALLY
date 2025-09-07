import { ReactNode } from 'react';

import styled from '@emotion/styled';

export default function Page({ children }: { children: ReactNode }) {
    return <Inner>{children}</Inner>;
}

const Inner = styled.div`
    padding: 2rem;
`;
