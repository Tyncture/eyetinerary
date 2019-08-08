import styled from "styled-components";

interface IProps {
  children: any;
  cssPadding?: number;
  cssColor?: string;
}

function SquareIcon(props: IProps) {
  const Component = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props.cssPadding};
    background: ${props.cssColor};
    border-radius: 0.375rem;
  `;
  return <Component>{props.children}</Component>;
}

SquareIcon.defaultProps = {
  cssPadding: "0.8rem",
  cssColor: "#F6F7F9",
};

export default SquareIcon;
