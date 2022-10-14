import React from "react";

function TwitterLink({ contact, className }) {
  const { username } = JSON.parse(contact.metadata);
  return (
    <>
      {username && (
        <a
          className={className}
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/${username}`}
        >
          @{username}
        </a>
      )}{" "}
    </>
  );
}

export default TwitterLink;
