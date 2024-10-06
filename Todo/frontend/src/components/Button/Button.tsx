interface ButtonProps {
  text?: string;
  type: "submit" | "button";
  icon?: string;
  className?: string;
  imgClass?: string;
  style?: object;
  onClick: () => void;
}

const Button = ({
  type = "button",
  text,
  icon,
  className,
  imgClass,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {text} <img src={icon} className={imgClass} />
    </button>
  );
};

export default Button;
