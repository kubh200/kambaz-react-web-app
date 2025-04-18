// import { Accordion, ListGroup } from "react-bootstrap";
// import PostItem from "./PostItem";

// interface Group {
//   label: string;
//   posts: any[];
// }

// interface PostsAccordionProps {
//   groups: Group[]
//   selectedPost: string | null
//   onPostClick: (postId: string) => void
// }
// export default function PostsAccordion({ groups, onPostClick, selectedPost }: PostsAccordionProps) {
//   return (
//     <Accordion alwaysOpen flush>
//       {groups.map((g, i) => (
//         <Accordion.Item key={g.label} eventKey={String(i)}>
//           <Accordion.Header>{g.label}</Accordion.Header>
//           <Accordion.Body className="px-2">
//           <ListGroup variant="flush">
//               {g.posts.map((p) => (
//                 <PostItem
//                   key={p._id}
//                   post={p}
//                   isSelected={selectedPost === p._id}
//                   onClick={() => onPostClick(p._id)}
//                 />
//               ))}
//             </ListGroup>
//           </Accordion.Body>
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// }
import { Accordion, ListGroup } from "react-bootstrap"
import PostItem from "./PostItem"

interface Group {
  label: string
  posts: any[]
}

interface PostsAccordionProps {
  groups: Group[]
  selectedPost: string | null
  onPostClick: (postId: string) => void
}

export default function PostsAccordion({
  groups,
  selectedPost,
  onPostClick,
}: PostsAccordionProps) {
  return (
    <Accordion alwaysOpen flush>
      {groups.map((g, i) => (
        <Accordion.Item key={g.label} eventKey={String(i)}>
          <Accordion.Header>{g.label}</Accordion.Header>
          <Accordion.Body className="px-2">
            <ListGroup variant="flush">
              {g.posts.map(p => (
                <PostItem
                  key={p._id}
                  post={p}
                  isSelected={selectedPost === p._id}
                  onClick={() => onPostClick(p._id)}
                />
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}