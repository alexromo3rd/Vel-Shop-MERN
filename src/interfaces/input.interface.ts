export default interface InputInterface {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  handleChange: (param?: any) => void;
  value: string;
  className: string;
  required: boolean;
}
