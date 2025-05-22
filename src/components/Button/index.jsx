import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const Button = ({children, classname, small, medium, large}) =>{
    const classnames =  cx("wrapper",{
        [classname]:classname,
        small,
        medium,
        large
    })
    return (
        <div className={classnames}><p>{children}</p></div>
    )
}

export default Button