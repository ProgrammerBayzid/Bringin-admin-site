import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import logo from "../../../../../public/browgerlogo.svg"
import { useState } from "react";

function Header() {

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);



  return (
    <div className="App sticky top-0 z-40 App  bg-white App shadow-[1px_1px_10px_2px_rgb(245,244,244)]   shadow lg:py-2 md:py-2 py-5  mb-10">

    <div className="flex items-center justify-between mx-10 ">
      <Image
        width={40}
        src={logo}
      ></Image>
      <h1 className="text-[30px] font-semibold"> <span className="text-[#0077B5]">Bringin</span> App </h1>
      <Space>
        <Badge >
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge >
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
        
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
      </Drawer>
    </div>
    </div>
  );
}
export default Header;
