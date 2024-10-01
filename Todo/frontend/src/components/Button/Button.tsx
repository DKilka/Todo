interface ButtonProps {
  text?: string;
  type: "submit" | "button";
  icon?: string;
  className?: string;
  imgClass?: string;
  onClick: () => void;
}

const Button = ({
  type = "button",
  text,
  icon,
  className,
  imgClass,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text} <img src={icon} className={imgClass} />
    </button>
  );
};

export default Button;
