'use client'
// Need "use client" because we're using a hook 'usePathname'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation'


import { useDispatch, useSelector } from 'react-redux';
import { addUserToStore } from '../reducers/user';


import styles from './header.module.css';

export default function Header() {

    // all logic about redux in this file should be used as an example and be removed whenever feels necessary
    const dispatch = useDispatch();
    const addUser = (newUser) => {
        dispatch(addUserToStore(newUser));
    }
    const user = useSelector((state) => state.user.value.name);
    console.log('user: ', user);

    // This will help us figure out what's the active link currently is, and add an "active" class to it
    const pathname = usePathname();

    const icon = {
        name: faHouse,
        classname: 'header-icon',
      }

    return <header className={styles.header}>
        <div className={styles.headerLeft}>
            <FontAwesomeIcon icon={icon.name} className={styles[icon.classname]} />
            <Link className={styles[`${pathname === '/' ? 'active' : 'link'}`]} href="/"> Home </Link>
            <Link className={styles[`${pathname === '/dashboard' ? 'active' : 'link'}`]} href="/dashboard"> Dashboard </Link>
            <Link className={styles[`${(pathname === '/accomodation' || pathname === '/accomodation/add') ? 'active' : 'link'}`]} href="/accomodation"> Accomodation </Link>
            <Link className={styles[`${pathname === '/activities' ? 'active' : 'link'}`]} href="/activities"> Activities </Link>
            <Link className={styles[`${pathname === '/planning' ? 'active' : 'link'}`]} href="/planning"> Planning </Link>
            <Link className={styles[`${pathname === '/chat' ? 'active' : 'link'}`]} href="/chat"> Chat </Link>
            <button onClick={() => addUser({token: 'test', userName: 'bob'})}>Add user with me</button>
            {user ? user.userName : ''}
        </div>
    </header>
}