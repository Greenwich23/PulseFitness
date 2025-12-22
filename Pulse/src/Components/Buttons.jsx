import styled from "styled-components";

const StyledButton = styled.button`
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 15px;

  /* Default style */
  background-color: black;
  color: white;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default StyledButton;
