import styles from './Card.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const Card = ({children, className}) =>{
    const classnames =  cx("wrapper",{
        [className]:className
    })
    return (
        <div className={classnames}>{children}</div>
    )
}

export default Card