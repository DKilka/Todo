interface CheckboxProps {
  labelFor: string;
  isChecked: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  labelFor,
  isChecked,
  className,
  onChange,
}: CheckboxProps) => {
  return (
    <label htmlFor={labelFor}>
      <input
        type="checkbox"
        className={className}
        defaultChecked={isChecked}
        id={labelFor}
        onChange={onChange}
      />
    </label>
  );
};

export default Checkbox;
