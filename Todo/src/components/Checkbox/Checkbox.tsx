import Input from "@components/Input/Input";

interface CheckboxProps {
  labelFor: string;
  isChecked: boolean;
  onChange: (e: any) => void;
}

const Checkbox = ({ labelFor, isChecked, onChange }: CheckboxProps) => {
  return (
    <label htmlFor={labelFor}>
      <Input
        type="checkbox"
        onChange={onChange}
        isChecked={isChecked}
        labelFor="checkbox"
      />
    </label>
  );
};

export default Checkbox;
