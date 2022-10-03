import React from "react";

function TwitterLink({ contact, className }) {
  const { twitterUsername } = JSON.parse(contact.metadata);
  return (
    <>
      {twitterUsername && (
        <a
          className={className}
          target="_blank"
          href={`https://twitter.com/${twitterUsername}`}
        >
          @{twitterUsername}
        </a>
      )}{" "}
    </>
  );
}

export default TwitterLink;
