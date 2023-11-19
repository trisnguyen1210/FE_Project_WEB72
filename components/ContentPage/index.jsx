import { useEffect, useState } from "react";
import { getVideos } from "../../src/apis/mock-data/database";
import { Card } from "antd";

const ContentPage = (token) => {
  const [listVideos, setListVideos] = useState([]);

  useEffect(() => {
    getVideos(token).then((res) => setListVideos(res.videos));
  }, []);
  return (
    <>
      <Card style={{ width: "fit-content" }}>
        {listVideos.map((video) => (
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
