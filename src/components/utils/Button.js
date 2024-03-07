import styles from './button.module.css';

export default function Button(props) {


    /*
    DEFAULT BEHAVIOUR : primary, transparent background, has border
        Types of button (based on "props.buttonClass"): 
            -primary : rectangle with border radius, background can be either transparent or passed color as prop, has border
            -secondary : rounded, background can be either transparent or passed color as prop, doesn't have border
        Buttons can have customized inline stylings, passed as props.style
        Buttons can accept "onCLick" props from parent, but all state logic must come from the parent
    */


  return (
    <button type={props.type} className={`${styles.button} ${styles[props.buttonClass] || styles.primary}`} style={props.style || {}} onClick={props.onClick}>
        {props.text}
    </button>
  );
}
