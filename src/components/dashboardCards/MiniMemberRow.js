'use client'
import styles from './miniMembersRow.module.css';

export default function MiniMemberRow(props) {


return(
<div className={styles.container} >
<div className={styles.photoContainer}></div>
<p>- {props.name}</p>
</div>
)}