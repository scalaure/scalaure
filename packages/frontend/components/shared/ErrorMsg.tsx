interface Props {
  readonly msg?: string;
}

export const ErrorMsg = ({ msg }: Props) => {
  return <p className='text-red-800'>{msg}</p>;
};
