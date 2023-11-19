import { useEffect, useState } from "react";
import { getVideos } from "../../src/apis/mock-data/database";
import { Card } from "antd";

const Videos = (token) => {
const [listVideos, setListVideos] = useState([]);

useEffect(() => {
   getVideos(token).then(res => setListVideos(res.videos))
},[])
console.log('data',listVideos)
  return(
    <>
    <Card style={{width:'fit-content'}}>
            {listVideos.map((video) => {
                return(
                    <>
                    <Card>
                        <p>{video?.titleVideo}</p>
                        <iframe width="100%" height="315" src={video.linkVideo} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Card>
                    </>
                )
            })}
    </Card>
    </>
  )
};
export default Videos;