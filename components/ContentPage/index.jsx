
import { Card } from "antd";

const ContentPage = (listVideos) => {
  
const listVideo = listVideos.listVideos
console.log('listVideo',listVideo)
  return (
    <>
      <Card style={{ width: "fit-content" }}>
        {listVideo.map((video) => (
          <Card key={video._id}>
            <p>{video?.titleVideo}</p>
            <iframe
              width="100%"
              height="315"
              src={video.linkVideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Card>
        ))}
      </Card>
    </>
  );
};
export default ContentPage;
