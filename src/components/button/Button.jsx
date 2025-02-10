import s from '../../App.module.css';

export const Button = ({handlerClick, children, className, style = {}}) => {
  return (
    <button style={style} className={`${s.button} ${className}`} onClick={handlerClick}>{children}</button>
  )
};
