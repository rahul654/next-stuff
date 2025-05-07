"use client";
import React, { useState } from "react";

type CommentProps = {
  id: number;
  author: string;
  text: string;
  replies: CommentProps[];
};

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="ml-4 mt-4 border-l-2 border-gray-200 pl-4">
      <div className="bg-white p-3 rounded shadow-sm flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.text}</p>
          </div>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm text-blue-500 hover:underline ml-4"
            >
              {showReplies ? "Hide" : "Show"} {comment.replies.length} repl{comment.replies.length > 1 ? "ies" : "y"}
            </button>
          )}
        </div>
      </div>

      {showReplies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [comments] = useState<CommentProps[]>([
    {
      id: 1,
      author: "Alice",
      text: "This is the first comment.",
      replies: [
        {
          id: 2,
          author: "Bob",
          text: "Reply to first comment.",
          replies: [
            {
              id: 3,
              author: "Charlie",
              text: "Reply to Bob.",
              replies: [
                {
                  id: 3.2,
                  author: "Charlie2",
                  text: "Reply to Charlie.",
                  replies: [
                    {
                      id: 3.3,
                      author: "Charlie3",
                      text: "Reply to Charlie2.",
                      replies: [
                        {
                          id: 3.3,
                          author: "Charlie4",
                          text: "Reply to Charlie3.",
                          replies: [
                            {
                              id: 3.3,
                              author: "Charlie5",
                              text: "Reply to Charlie4.",
                              replies: [
                                {
                                  id: 3.3,
                                  author: "Charlie6",
                                  text: "Reply to Charlie5.",
                                  replies: [],
                                },],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2.2,
          author: "Bob2",
          text: "Reply to first comment.",
          replies: [
            {
              id: 3,
              author: "Charlie",
              text: "Reply to Bob2.",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      author: "David",
      text: "Another top-level comment.",
      replies: [],
    },
  ]);

  return (
    <main className="p-6 w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </main>
  );
}
