import React from "react";
import styled from "styled-components";

const Host = styled.header`
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 1rem;
    background-color: black;
    color: white;
    box-shadow: 0 0 5px 4px rgba(0, 0, 0, .3);
`;

const Title = styled.h1`
    letter-spacing: .2rem;
`;

const Header: React.FC = props => (
    <Host>
        <Title>Todo List</Title>
    </Host>
);

export default Header;
