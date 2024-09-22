import "@styles/button/button.scss";

interface ButtonProps {
  text?: string;
  type: "submit" | "button";
  icon?: string;
  onClick: () => void;
}

const Button = ({
  type = "button",
  text = "Button",
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {text} <img src={icon} />
    </button>
  );
};

export default Button;
