import React from "react";

function TwitterLink({ contact, className }) {
  const { twitterUsername } = JSON.parse(contact.metadata);
  return (
    <>
      {twitterUsername && (
        <a
          className={className}
          href={`https://twitter.com/${twitterUsername}`}
        >
          @{twitterUsername}
        </a>
      )}{" "}
    </>
  );
}

export default TwitterLink;
