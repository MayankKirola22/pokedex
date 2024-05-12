import { useState } from "react";
import "./AudioButton.css";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

export default function AudioButton({link,text}){
        const [isPlaying,setPlaying]=useState(false);
        function playPause() {
            var track = document.getElementById(link);
            if (!isPlaying) {
                track.play();
                setPlaying(true)
            } else { 
                setPlaying(false)
                track.pause();
            }
        }
    return(
        <div id="AudioButton">
            <audio id={link} onEnded={()=>setPlaying(false)}>
                <source src={link} type="audio/mpeg" />
            </audio>
            <div id="play-pause" onClick={playPause} className="play">{isPlaying?<FaPause size={20} />:<FaPlay />}</div>
            <div>{text}</div>
        </div>
    )
}