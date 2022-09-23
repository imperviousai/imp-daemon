import { Fragment, useEffect, useState } from "react";
import { BigHead } from "@bigheads/core";

function ContactAvatar({ contact, className }) {
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    if (contact) {
      const { avatar, avatarUrl } = JSON.parse(contact.metadata);
      setAvatar(avatar);
      setAvatarUrl(avatarUrl);
    }
  }, [contact]);

  return (
    <Fragment>
      {avatarUrl ? (
        <img
          className={`rounded-full ${className}`}
          src={avatarUrl}
          alt="avatar"
        />
      ) : avatar ? (
        <BigHead className={className} {...avatar} />
      ) : (
        <BigHead className={className} />
      )}
    </Fragment>
  );
}

export default ContactAvatar;
