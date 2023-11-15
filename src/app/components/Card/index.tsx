import { PostData } from "@/app/types/posts";
import { Avatar, Card, Image } from "antd";
import Meta from "antd/es/card/Meta";

export default function PostCard({ post }: { post: PostData }) {
  return (
    <Card
      hoverable
      style={{ width: 720 }}
      cover={<Image alt="example" src={post.postImage} />}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          <Avatar size={64} src={post.authorAvatar} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <Meta title={post.authorName} description={post.postText} />
          <Meta
            title="Posted: "
            description={new Date(post.createdAt).toDateString()}
          />
        </div>
      </div>
    </Card>
  );
}
