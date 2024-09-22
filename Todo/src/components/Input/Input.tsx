import "@styles/input/input.scss";

interface InputProps {
  labelFor: string;
  type?: string;
  placeholder?: string;
  value?: string;
  isChecked?: boolean;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
}

const Input = ({
  labelFor,
  type = "text",
  placeholder,
  value,
  isChecked,
  onChange,
  onClick,
}: InputProps) => {
  return (
    <label htmlFor={labelFor}>
      <input
        type={type}
        readOnly={type === "text" || "checkbox" ? false : true}
        id={labelFor}
        onChange={onChange}
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        checked={isChecked}
      />
    </label>
  );
};

export default Input;
