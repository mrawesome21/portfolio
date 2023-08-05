import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";

import Emoji from "@/components/Global/Emoji";
import FetchError from "@/components/Global/FetchError";
import BlogPostsQuery from "@/graphql/BlogPostsQuery";
import MainLayout from "@/layouts/MainLayout";
import { queryContentful } from "@/lib/ContentfulUtil";
import { logger } from "@/lib/Logger";
import { Err, Ok } from "@/lib/ReturnTypes";
import { BlogPost } from "@/lib/types";

type TagsProps = {
  tags: string[];
};

const Tags = ({ tags }: TagsProps) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <p key={tag} className="w-min flex items-center text-sm text-white bg-secondary rounded-full space-x-1 px-3 py-1">
        <FiTag size={20} />
        <span>{tag}</span>
      </p>
    ))}
  </div>
);

export const convertDateToFullString = (rawDateStr: string): string => {
  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = rawDateStr.split("T")[0].split("-");
  return `${fullMonths[parseInt(date[1], 10) - 1]} ${date[2]}, ${date[0]}`;
};

const estimateReadingTime = (content) => {
  const AVG_READ_SPEED = 250; // words per minute
  const AVG_WORD_LENGTH = 6; // letters

  const totalChars = content
    .map(({ content: bodyContent, nodeType }) => {
      if (nodeType === "paragraph") {
        return bodyContent
          .map(({ value }) =>
            value
              .split(" ")
              .map((word) => word.length / AVG_WORD_LENGTH)
              .reduce((prevLength, currLength) => prevLength + currLength)
          )
          .reduce((prevLength, currLength) => prevLength + currLength);
      }
      return 0;
    })
    .reduce((prevValue, currValue) => prevValue + currValue);

  return Math.ceil(totalChars / (AVG_READ_SPEED * AVG_WORD_LENGTH));
};

type BlogPostCardProps = BlogPost & {
  featured?: boolean;
};

const BlogPostCard = ({
  postId,
  title,
  publishDate,
  topicTags: tags,
  heroBanner: { title: imgTitle, url, width, height },
  body: {
    json: { content },
  },
  featured = false,
}: BlogPostCardProps) => {
  const readTimeEstimate = estimateReadingTime(content);

  return (
    <Link href={`/blog/${postId}`} passHref>
      <button
        type="button"
        className={`${
          featured ? "flex flex-col lg:grid lg:grid-cols-3" : ""
        } overflow-hidden border-2 border-transparent hover:border-primary/75 dark-transition rounded-xl space-y-4`}
      >
        <div
          className={`flex items-center overflow-hidden ${
            featured ? "lg:col-span-2 md:h-48 lg:h-72" : "lg:h-40 xl:h-44"
          } rounded-lg`}
        >
          <Image src={url} alt={imgTitle} width={width} height={height} layout="intrinsic" className="rounded-lg" />
        </div>
        <div className={`w-full space-y-2 lg:space-y-3 ${featured ? "p-3 lg:p-4" : "px-3 lg:px-4 pb-3 lg:pb-4"}`}>
          <div>
            <div className="flex lg:flex-col xl:flex-row justify-between lg:items-start text-gray-700 dark:text-gray-300">
              <p className="text-sm lg:text-base">{convertDateToFullString(publishDate)}</p>
              <p className="text-sm lg:text-base">{readTimeEstimate} min read</p>
            </div>
            <h2 className="text-left text-xl lg:text-2xl font-semibold">{title}</h2>
          </div>
          <Tags {...{ tags }} />
        </div>
      </button>
    </Link>
  );
};

type BlogProps = {
  blogPosts: BlogPost[];
};

const Blog = ({ blogPosts }: BlogProps) => (
  <MainLayout page="Blog">
    <div className="max-w-lg lg:max-w-2xl xl:max-w-4xl space-y-8 px-8 mx-auto mt-10">
      <h1 className="text-5xl font-semibold">
        devDeque <Emoji label="fountain pen" symbol="✒️" />
      </h1>
      {!blogPosts && <FetchError />}
      {blogPosts?.length && (
        <>
          <BlogPostCard
            postId={blogPosts[0].postId}
            title={blogPosts[0].title}
            publishDate={blogPosts[0].publishDate}
            topicTags={blogPosts[0].topicTags}
            heroBanner={blogPosts[0].heroBanner}
            body={blogPosts[0].body}
            featured
          />
          <div className="flex flex-col md:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {blogPosts.slice(1).map((blogPost) => (
              <BlogPostCard
                key={blogPost.postId}
                postId={blogPost.postId}
                title={blogPost.title}
                publishDate={blogPost.publishDate}
                topicTags={blogPost.topicTags}
                heroBanner={blogPost.heroBanner}
                body={blogPost.body}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </MainLayout>
);

type BlogQR = BlogProps;

export const getStaticProps = async () => {
  const response = await queryContentful<BlogQR>(BlogPostsQuery);

  if (response.isErr()) {
    const err = (response as Err<Error>).unwrap();
    logger.error(`Something went wrong with fetching blog posts: ${err.message}`);
    return {
      props: {
        blogPosts: [],
      },
    };
  }

  const { blogPosts } = (response as Ok<BlogQR>).unwrap();

  return {
    props: {
      blogPosts,
    },
  };
};

export default Blog;
