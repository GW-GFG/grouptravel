"use client";
import styles from './inputLabel.module.css';

//vv extract the label and then the rest of the props vv
export default function InputLabel({ label, ...rest }) {
  //label = props.label is use to display label on top
  // spread operator "...rest" extract all the rest of the props to use (type={props.type})
  // to change width individually: add inline style in props directly in the main component (style={{width: "10px"}})
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.inputLabel}
        {...rest}
      />
    </div>
  );
}
