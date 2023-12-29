import styled from "styled-components";

const borderRadius = "10px";

export const Button = styled.button`
  margin: 10px;
  background-color: rgb(32, 107, 163);
  color: whitesmoke;
  font-size: 1.2em;
  min-width: 100px;
  min-height: 40px;
  border: none;
  border-radius: ${borderRadius};
  &:hover {
    cursor: pointer;
    background-color: rgb(15, 53, 99);
    transition: transform 500ms ease-in-out;
  }
  &:active {
    transform: scale(0.8);
    transition: transform 100ms ease-in-out;
  }
`;

export const LoginHeader = styled.h2`
  width: 300px;
  text-align: center;
`;

export const Label = styled.label`
  font-size: 1.2em;
  width: 250px;
`;

export const Input = styled.input`
  font-size: 1.2em;
  width: 250px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  border: 1px solid black;
  border-radius: ${borderRadius};
`;

export const Loginform = styled(Form)`
  position: relative;
  top: 200px;
  height: 400px;
`;

export const Ul = styled.ul`
  all: unset;
  list-style: none;
  margin-bottom: 5px;
`;

export const Li = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

export const Navmenu = styled.ul`
  all: unset;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavmenuItem = styled.li`
  list-style: none;
  margin-left: 20px;
  font-size: 1.2em;
`;

export const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid black;
`;

export const MenuHeader = styled.h1`
  font-weight: 900;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 70px;
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: ${borderRadius};
`;

export const BlogTitle = styled.h1`
  margin-right: 10px;
`;

export const NotificationBox = styled.div`
  margin: 10px;
  font-size: 1.1em;
  border: 1px solid;
  border-radius: ${borderRadius};
  padding: 10px;
  margin-bottom: 10px;
  color: ${(props) => (props.type === "error" ? "darkred" : "darkgreen")};
  background-color: ${(props) =>
    props.type === "error" ? "rgb(224,102,102)" : "rgb(163,193,151)"};
`;

export const Table = styled.table`
  width: 90%;
`;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: start;
  align-items: center;
`;

export const Th = styled.th`
  margin: 10px;
  font-size: 1.4em;
`;

export const Td = styled.td`
  margin: 10px;
  font-size: 1.2em;
`;

export const CommentsBox = styled(Container)`
  width: 90%;
  margin-left: 20px;
  display: flex;
  justify-items: start;
  align-items: start;
`;

export const BlogComment = styled(Card)`
  height: 40px;
`;

export const CommentForm = styled(Form)`
  flex-direction: row;
`;
