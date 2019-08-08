import SquareIcon from "./base/SquareIcon";
import FaFileAltSolid from "../../static/fontawesome/file-alt-solid.svg";
import styled from "styled-components";

interface IProps {
  cssIconColour?: string; 
  cssIconBackground?: string;
}

function PageIcon(props: IProps) {
  const absHeightWidth = "1.6669rem";
  const SVGStyler = styled.span`
    width: ${absHeightWidth};
    height: ${absHeightWidth};
    svg {
      path {
        fill: ${props.cssIconColour};
      }
      width: ${absHeightWidth};
      height: ${absHeightWidth};
    }
  `;

  return (
    <SquareIcon cssColor={props.cssIconBackground}>
      <SVGStyler>
        <FaFileAltSolid style={{ display: "none;" }} />
      </SVGStyler>
    </SquareIcon>
  );
}

PageIcon.defaultProps = {
  cssIconColour: "#DFE5EC",
  cssIconBackground: "#F6F7F9",
};

export default PageIcon;
