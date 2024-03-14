"use client";
import { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { lexend } from "../app/fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import TripRow from "./TripRow";
import Image from "next/image";
import { addUserToStore } from "@/reducers/user";
import Button from "./utils/Button";


export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.value);
  const [rerender, setRerender] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5500/users/getUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( {token: user.token} ),
  }).then(response => response.json())
  .then(userData => {  
    dispatch(addUserToStore(userData))
    });
  } , [rerender]);

  //Map on user.myTrips Only if != null
  const trips =
    user.myTrips &&
    user.myTrips.length > 0 &&
    user.myTrips.map((data, i) => {
      return <TripRow key={i} {...data} />;
    });

  const handleClickAddTrip = () => {
    router.push("/addTrip");
  };

  const pictureStyle = {
    borderRadius: "50%",
    border: "2px solid #ffffff",
  };

  const backPictureStyle = {
    borderRadius: "1rem 1rem",
    border: "2px solid var(--primary-black-color)",
  };

  //Handle picture

  const handleClickProfilPicture = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {

    const selectedPicture = e.target.files[0];
  
    if (selectedPicture){

      const formData = new FormData();
      formData.append("image", selectedPicture);

      fetch("http://localhost:5500/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((pictureData) => {
          if (!pictureData || !pictureData.url) {
            return console.log(" No picture ");
          } else {

            const newProfilePictureUrl = pictureData.url;

            return fetch("http://localhost:5500/users/updateOne", {
              method: "PUT",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify({
                token: user.token,
                profilPicture: newProfilePictureUrl,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  console.log("Photo mise à jour");
                  setRerender(!rerender)
                } else {
                  console.log("Impossible de mettre la photo à jour");
                }
              });
          }
        })  
    }
  };

    return (
      <div className={styles.container}>
        <h1 className={`${styles.title} ${lexend.className}`}>Mon Compte</h1>
        <div className={styles.profileContent}>
          <div className={styles.leftContainer}>
            <div className={styles.profilPictureContainer}>
              <Image
                src={user.userPicture || 'avatar.png'}
                alt="Avatar"
                fill={true}
                style={pictureStyle}
              />
              <input
                type="file"
                id="profile-picture"
                ref={fileInputRef} // Ref to handleclick from penIcon
                onChange={handleFileChange}
                style={{ display: "none" }} // To hide input
              />
              <div className={styles.buttonPlace}>
                <Button type="text" onClick={handleClickProfilPicture} text={<FontAwesomeIcon icon={faPen} className={styles.penIcon} />} >
                  <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
                </Button>
              </div>
            </div>
            <div>
              <span>Bienvenue {user.username} !</span>
            </div>
          </div>
          <div className={styles.tripsContainer}>
            <h2 className={`${styles.tripTitle} ${lexend.className}`}> Mes voyages : </h2>
            <div className={styles.tripsList}>
              {trips}
            </div>
            <div className={styles.addContainer}>
              <button
                className={styles.addTravel}
                onClick={() => handleClickAddTrip()}
              >
                <span className={styles.plus}>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className={styles.faCirclePlusIcon}
                  />
                </span>
                <br />
                Organise un nouveau Travel entre amis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
