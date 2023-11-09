interface Props {
  type: "button" | "submit";
  className?: string;
  text: string;
  onClick?: () => void;
}

export const Button = ({ type, text, className, onClick }: Props) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;