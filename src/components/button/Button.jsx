import s from '../../App.module.css';

export const Button = ({handlerClick, children, className}) => {
  return (
    <button className={`${s.button} ${className}`} onClick={handlerClick}>{children}</button>
  )
};
