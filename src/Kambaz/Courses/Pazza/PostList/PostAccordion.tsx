import { Accordion } from "react-bootstrap";
import PostItem from "./PostItem";

interface Group {
  label: string;
  posts: any[];
}

export default function PostsAccordion({ groups }: { groups: Group[] }) {
  return (
    <Accordion alwaysOpen flush>
      {groups.map((g, i) => (
        <Accordion.Item key={g.label} eventKey={String(i)}>
          <Accordion.Header>{g.label}</Accordion.Header>
          <Accordion.Body className="px-2">
            {g.posts.map((p: any) => (
              <PostItem
                key={p._id}
                post={p}
                isSelected={false /* hook up later if needed */}
                onClick={() => {}}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
