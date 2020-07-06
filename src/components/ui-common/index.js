import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TitleContainer = styled.div`
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

export const Info = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  display: inline-block;
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
`;

export const Link = styled(NavLink)`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.25rem;
  text-decoration: none;

  &:hover {
    color: #17a2b8;
  }
`;

export const Input = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 50%;
  box-sizing: border-box;
  margin: 5px 0px;
  border-radius: 3px;
`;

export const FormButton = styled.button`
  background-color: #17a2b8;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 3px;
  font-weight: bold;

  &:hover {
    opacity: 0.6;
  }
`;

export const RedirectAuth = styled.div`
  font-size: large;
`;

export const AuthContainer = styled.div`
  margin: 5% 15%;
`;

export const AuthTitle = styled.h1`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #17a2b8;
`;

export const AuthAccount = styled.div`
  display: flex;
  font-size: larger;
  padding-bottom: 5px;
`;

export const LoadingContent = styled.h5`
  color: darkgray;
  line-height: 5px;
  font-size: medium;
`;
