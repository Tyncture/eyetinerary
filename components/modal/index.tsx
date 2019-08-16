interface IProps {
  children?: Array<JSX.Element | React.Component>;
}

function Modal(props: IProps) {
  return (
    <div className="modal">
      <div className="modal__inner">{...props.children}</div>
    </div>
  );
}

export default Modal;
