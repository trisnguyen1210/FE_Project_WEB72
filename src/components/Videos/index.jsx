import { useState } from "react";
import { createVideo, deleteVideo } from "../../apis/mock-data/database";
import {
  Space,
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Videos = (listVideos) => {
  const [listVideosData, setListVideosData] = useState(listVideos.listVideos);
  const [isModalAddVideo, setIsModalAddVideo] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [tags, setTags] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  // const [fileThumbnail, setFileThumbnail] = useState(null);
  const handleAddVideo = async () => {
    try {
      const imgThumbnail = fileList[0]?.originFileObj;
      const formData = new FormData();
      formData.append("titleVideo", title);
      formData.append("URL", linkVideo);
      formData.append("contentVideo", content);
      formData.append("thumbnailVideo", imgThumbnail);
      formData.append("tagVideo", tags);
      formData.append(
        "createBy",
        JSON.parse(localStorage.getItem("token")).user.username
      );
      const result = await createVideo(formData);
      if (result) {
        setListVideosData(
          listVideosData.filter((item) => item._id != data._id)
        );
      }
      setIsModalAddVideo(false);
    } catch (error) {
      console.log("error", error);
      setIsModalAddVideo(false);
    }
  };

  const handleDeleteVideo = async (data) => {
    try {
      const id = data._id;
      const video = data.titleVideo;
      const username = JSON.parse(localStorage.getItem("token")).user.username;
      const result = await deleteVideo(id, { username, video });
      if (result) {
        setListVideosData(listVideosData.filter((item) => item._id != id));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const ulrThumbnail =
    "https://res.cloudinary.com/dwnty3zou/image/upload/project_web72/";
  const tagsVideo = [
    "Action movie",
    "Adventure movie",
    "Biography",
    "Cartoon",
    "Comedy",
    "Documentary",
    "Drama",
    "Historical",
    "Horror",
    "Musical",
    "Romance",
    "Sitcom",
  ];
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.name.replace(" ", "-");
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // const handleEditVideo = (data) => {
  //     setIsEdit(true)
  //     setIsModalAddVideo(true)
  //     setContent(data.contentVideo)
  //     setTitle(data.titleVideo)
  //     setLinkVideo(data.linkVideo)
  //     setTags(data.tagVideo)
  // }
  //Trinvm end Update
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const { Column } = Table;
  const data = listVideosData
    .filter(
      (item) =>
        item.createBy ===
        JSON.parse(localStorage.getItem("token")).user.username
    )
    .map((item) => {
      return item;
    });
  console.log("data", data);
  return (
    <>
      <Card>
        <Modal
          title="Add Video"
          open={isModalAddVideo}
          onOk={handleAddVideo}
          onCancel={() => setIsModalAddVideo(false)}
        >
          <Form
            name="normal_add_video"
            className="login-add-video"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your Title!",
                },
              ]}
            >
              <div>
                <p>Title :</p>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="link"
              rules={[
                {
                  required: true,
                  message: "Please input your Link video!",
                },
              ]}
            >
              <div>
                <p>Link Video :</p>
                <Input
                  placeholder="Link Video"
                  value={linkVideo}
                  onChange={(e) => {
                    setLinkVideo(e.target.value);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please input your Content!",
                },
              ]}
            >
              <div>
                <p>Content :</p>
                <Input
                  placeholder="Content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item name="tagVideo">
              <div>
                <p>Tags :</p>
                <Checkbox.Group
                  options={tagsVideo}
                  onChange={(e) => setTags(e)}
                />
              </div>
            </Form.Item>
            <Form.Item name="thumbnailVideo">
              <div>
                <p>Thumbnail :</p>
                <div>
                  <Upload
                    beforeUpload={() => false}
                    action=""
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "16px",
          }}
        >
          <Button
            onClick={() => {
              setIsModalAddVideo(true);
            }}
          >
            Add Video
          </Button>
        </div>
        <Table dataSource={data} rowKey={(data) => data._id}>
          <Column title="Title" dataIndex="titleVideo" key="titleVideo" />
          <Column title="LinkVideo" dataIndex="linkVideo" key="linkVideo" />
          <Column title="Content" dataIndex="contentVideo" key="contentVideo" />
          <Column
            title="Thumbnail"
            dataIndex="thumbnailVideo"
            key="thumbnailVideo"
            render={(url) => (
              <>
                <img
                  width={100}
                  src={`${ulrThumbnail}/${url}`}
                  alt="thumbnail"
                />
              </>
            )}
          />
          <Column
            title="Tags"
            dataIndex="tagVideo"
            key="tagVideo"
            render={(tags) => (
              <>
                {tags.map((tag, index) => (
                  <Tag color="blue" key={index}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(data) => (
              <Space size="middle">
                {/* <button onClick={handleEditVideo(data)}>Edit</button> */}
                <a onClick={() => handleDeleteVideo(data)}>Delete</a>
              </Space>
            )}
          />
        </Table>
      </Card>
    </>
  );
};
export default Videos;
