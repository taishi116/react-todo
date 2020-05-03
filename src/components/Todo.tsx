import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Todo } from "../types"

const Host = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, .3);
    border-radius: 8px;
    margin: .5rem 1rem;
    padding: .5rem 1rem;
    max-width: clac(100% - 2rem);
`;

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    min-width: 0;
`;

const Button = styled.button`
    padding: 10px;
    box-sizing: border-box;
    /* margin: 0 0 0 auto; */
    border: 1px solid black;
    margin-bottom: .4rem;
    margin-right: 1rem;
`;

const Title = styled.h3`
    margin: 0;
    margin-bottom: .5rem;
`;

const Description = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const TodoUpdateForm = styled.form``;
const TitleInput = styled.input``;
const DescriptonInput = styled.input``;

interface Props extends Todo {
    onDelete: () => void;
    onUpdate: (id: Todo["id"], title: Todo["title"], description: Todo["description"]) => void;
}

const TodoComponent: React.FC<Props> =  ({ onDelete, onUpdate, id, title, description }) => {
  let [isEditing, setIsEditing] = useState<boolean>(false);
  const titileInputElement = useRef<HTMLInputElement | null>(null);
  const descriptionInputElement = useRef<HTMLInputElement | null>(null);

  const formId = `todo-update-form-${id}`;
  const editButtonKey = `edit-button-key-${id}`;
  return (
    <Host>
        {isEditing ? (
          <TodoUpdateForm
            id={formId}
            onSubmit={e => {
              setIsEditing(false);
              console.log("called onsubmit function", e, e.type);
              e.preventDefault();
              if (titileInputElement.current?.value === undefined) {
                return;
              }
              if (descriptionInputElement.current?.value === undefined) {
                return;
              }
              onUpdate(id, titileInputElement.current?.value, descriptionInputElement.current?.value);
            }
          }>
              <TitleInput type="text" defaultValue={title} ref={titileInputElement}></TitleInput>
              <DescriptonInput type="text" defaultValue={description} ref={descriptionInputElement}></DescriptonInput>
          </TodoUpdateForm>
       ) : (
          <TodoContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </TodoContainer>
       )}
        {isEditing ? <Button type="submit" form={formId} onClick={() => console.log("clicked save button")}>Save</Button> : <Button key={editButtonKey} onClick={e => { console.log("clicked edit button", e.target); setIsEditing(true) }}>Edit</Button>}
        {/* <Button onClick={e => { console.log("clicked edit button", e.target); setIsEditing(true) }}>Edit</Button> */}
        <Button onClick={onDelete}>Delete</Button>
    </Host>
  )
};

export default TodoComponent;
