export const Button = ({handlerClick, children}) => {
  return (
    <button onClick={handlerClick}>{children}</button>
  )
};
