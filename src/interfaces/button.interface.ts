export default interface Button {
  label: string;
  styleName: string;
  handleClick: (param?: any) => any;
}
