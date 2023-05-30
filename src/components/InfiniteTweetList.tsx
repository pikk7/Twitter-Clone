import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export function InfiniteTweetList({
  tweets,
  isLoading,
  isError,
  fetchNewTweets,
  hasMore,
}: InfiniTweetListProps) {
  if (isLoading) return <h1>loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"Loading..."}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

function TweetCard({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) {
  return (
    <li key={id} className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="outline:none font-bold hover:underline focus-visible:underline "
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitspace-prep-wrap">{content}</p>
        <HeartButton likedByMe={likedByMe} likeCount={likeCount} />
      </div>
    </li>
  );
}

type HeartButtonProps = {
  likedByMe: boolean;
  likeCount: number;
};

function HeartButton({ likedByMe, likeCount }: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button className="mb-1 mt-1 flex items-center gap-3 self-start"></button>
  );
}
