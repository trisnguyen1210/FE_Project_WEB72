import { useEffect, useState } from "react";
import { getVideos, } from "../../src/apis/mock-data/database";
import { Space, Card, Table, Tag, Button, Modal, Form, Input, Checkbox, Upload } from "antd";
import "./style.css";

const Videos = (token) => {
    const [listVideos, setListVideos] = useState([]);
    const [isModalAddVideo, setIsModalAddVideo] = useState(false)
    const ulrThumbnail = 'https://res.cloudinary.com/dwnty3zou/image/upload/project_web72/'
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
    useEffect(() => {
        getVideos(token).then(res => setListVideos(res.videos))
    }, [])

    const { Column } = Table;
    const data = listVideos.filter(item => item.createBy === JSON.parse(localStorage.getItem('token')).user.username).map(item => {
        return(
            item
        )
    });
    return (
        <>
            <Card>
                <Modal title="Add Video" open={isModalAddVideo} onOk={() => setIsModalAddVideo(false)} onCancel={() => setIsModalAddVideo(false)} 
                width={"50%"} style={{margin: '36px auto'}}>
                    <Form
                        name="normal_add_video"
                        className="login-add-video"
                        initialValues={{
                            remember: true,
                        }}
                        style={{textAlign: 'start'}}
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Title!',
                                },
                            ]}
                        >
                            <span>Title :</span>
                            <Input placeholder="Title" 
                            onChange={() => {}} 
                            />
                        </Form.Item>
                        <Form.Item
                            name="link"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Link video!',
                                },
                            ]}
                        >
                            <span>Link Video :</span>
                            <Input placeholder="Link Video" 
                            onChange={() => {}} 
                            />
                        </Form.Item>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Content!',
                                },
                            ]}
                        >
                            <span>Content :</span>
                            <Input placeholder="Content" 
                            onChange={() => {}} 
                            />
                        </Form.Item>
                        <Form.Item name="tagVideo">
                            <span>Tags :</span>
                            <Checkbox.Group options={tagsVideo} onChange={() => {}} />
                        </Form.Item>
                        <Form.Item>
                            <span>Thumbnail :</span>
                            <Upload
                                // beforeUpload={() => false}
                                // action=""
                                // listType="picture-card"
                                // fileList={fileList}
                                // onPreview={handlePreview}
                                // onChange={handleChange}
                            >
                                {/* {fileList.length >= 1 ? null : uploadButton} */}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
                <div style={{ display: "flex", justifyContent: "flex-end", margin: '16px' }}>
                    <Button onClick={()=>{setIsModalAddVideo(true)}}>Add Video</Button>
                </div>
                <Table dataSource={data}>
                    <Column title="Title" dataIndex="titleVideo" key="titleVideo" />
                    <Column title="LinkVideo" dataIndex="linkVideo" key="linkVideo" />
                    <Column title="Content" dataIndex="contentVideo" key="contentVideo" />
                    <Column title="Thumbnail" dataIndex="thumbnailVideo" key="thumbnailVideo" 
                    render={(url) => (
                        <>
                            <img width={100} src={`${ulrThumbnail}/${url}`} alt="thumbnail"/>
                        </>
                    )}/>
                    <Column
                        title="Tags"
                        dataIndex="tagVideo"
                        key="tagVideo"
                        render={(tags) => (
                            <>
                                {tags.map((tag) => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <a>Edit {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </Card>
        </>
    )
};
export default Videos;