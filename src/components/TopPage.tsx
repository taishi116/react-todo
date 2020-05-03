import React from "react";
import styled from "styled-components";

import TodoListContainer from "../containers/TodoListContainer";
import Header from "./Header";

const Host = styled.div`
    margin-top: 7rem;
`;

const TopPage: React.FC = props => (
    <Host>
        <Header></Header>
        <TodoListContainer />
    </Host>
);

export default TopPage;
