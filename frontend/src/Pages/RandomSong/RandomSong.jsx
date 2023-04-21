import { useEffect, useState } from "react";
import "../RandomSong/randomsong.css";
import { baseURL } from "../../Utils/baseURL";

function RandomSong() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [songInfo, setSongInfo] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        fetch(`${baseURL}/api/genres`)
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => setGenres(data));
    }, []);

    const handleRandomSongClick = async () => {
        const response = await fetch(`${baseURL}/api/randomsong?genreId=${selectedGenre}`);
        console.log(response);
        const { info, previewUrl } = await response.json();

        setSongInfo(info);
        setPreviewUrl(previewUrl);

        if (audio) {
            audio.pause();
        }

        const newAudio = new Audio(previewUrl);
        setAudio(newAudio);
    };

    const handleAudioClick = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div id="app">
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <button onClick={handleRandomSongClick}>Get a random song</button>
            <div id="song-info">{songInfo}</div>
            {previewUrl && (
                <div id="main_cover" className={isPlaying ? "active" : "inactive"} onClick={handleAudioClick}>
                    <div id="main">
                        <div className="bar" id="_1"></div>
                        <div className="bar" id="_2"></div>
                        <div className="bar" id="_3"></div>
                        <div className="bar" id="_4"></div>
                        <div className="bar" id="_5"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RandomSong;
