import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'

//TODO: make "Pronounce app" button interactive to home

const useStyles = makeStyles( () => ({
  nav : {
    backgroundColor: "black",
    color:"white",
    
    height: "50px",
    padding: "10px",

    display: "flex",
    alignItems: "center",
  },
  titleBox : {
    justifyContent:"center",
    width:"180px",
    minWidth:"180px",
    height:"40px",
    border:"1px solid white",
    margin:"0px",
    // hover: { cursor: "hand" }
  },
  ul : {
    display: "flex",
    listStyle: "none",
    justifyContent: "center"
  },
  li : {
    margin: "10px"
  }
}));

const Nav = () => {
  
  const styles = useStyles();

  return (
    <nav className={styles.nav}>
        <div className={styles.titleBox}>
          <h1 style={{margin:"5px", fontStyle:"italic"}}>Pronounce app</h1>
        </div>
      <div style={{flexGrow:1}}></div>
      <div>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href=''> Home </Link>
          </li>
          <li className={styles.li}>
            <Link href=''> Contact </Link>
          </li>
          <li className={styles.li}>
            <Link href=''> About </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
