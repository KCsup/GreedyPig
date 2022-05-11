import Image from 'next/image'
import styles from '../styles/Die.module.scss'

type DieProps = {
    roll: number
}

const Die = ({ roll }: DieProps) => {
    return (
        <div className={styles.container}>
            <a>
                {roll == 0 ? null : (
                    <Image src={require(`../public/Dice${roll}.png`)}/>
                )}
                
            </a>
        </div>
    )
}

export default Die
