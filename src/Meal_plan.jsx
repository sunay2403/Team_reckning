import styles from './design.module.css';
import ScrollTabs from './tab_module';

function Meal_plan(){
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Your Diet Plan</h1>
            <div className={styles.inner_card}>
                <ScrollTabs/>
            </div>
        </div>
    );
}

export default Meal_plan