import { Card, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const ContentPage = (listVideos) => {
  const listVideo = listVideos.listVideos;

  const [showTag, setShowTag] = useState({});
  const [showContent, setShowContent] = useState({});

  const setCardContent = (videoId) => {
    setShowContent((prevStates) => ({
      ...prevStates,
      [videoId]: !prevStates[videoId],
    }));
  };

  const setCardTag = (videoId) => {
    setShowTag((prevStates) => ({
      ...prevStates,
      [videoId]: !prevStates[videoId],
    }));
  };

  return (
    <>
      <div
        style={{
          width: "fit-content",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "5px",
        }}
      >
        {listVideo.map((video, index) => (
          <div key={index}>
            <Card
              key={video._id}
              title={video.titleVideo}
              hoverable
              actions={[
                <SettingOutlined
                  key="setting"
                  onClick={() => {
                    setCardTag(video._id);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setCardContent(video._id);
                  }}
                />,
              ]}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <iframe
                  width="100%"
                  height="400"
                  src={video.linkVideo}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              {showTag[video._id] &&
                video.tagVideo.map((e, index) => <Tag key={index}>{e}</Tag>)}
              {showContent[video._id] && <p>{video.contentVideo}</p>}
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default ContentPage;
