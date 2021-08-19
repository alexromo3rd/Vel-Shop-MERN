import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaSpotify } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import './Footer.scss';

const iconStyle = { color: '#000', fontSize: '24px' };

const Footer = () => {
  return (
    <footer>
      <a
        href='https://www.instagram.com/vel_nine'
        target='_blank'
        rel='noreferrer'
        className='inline-link'
      >
        <AiFillInstagram style={iconStyle} />
      </a>
      <a
        href='https://www.facebook.com/Vel-9-383125315074652/'
        target='_blank'
        rel='noreferrer'
        className='inline-link'
      >
        <FaFacebookF style={iconStyle} />
      </a>
      <a
        href='https://twitter.com/velthewonder'
        target='_blank'
        rel='noreferrer'
        className='inline-link'
      >
        <FaTwitter style={iconStyle} />
      </a>
      <a
        href='https://www.youtube.com/channel/UCnit1Sd-IUQfRIb_hwYClTA'
        target='_blank'
        rel='noreferrer'
        className='inline-link'
      >
        <FaYoutube style={iconStyle} />
      </a>
      <a
        href='https://open.spotify.com/artist/6Dcufc8lKB2eVG5JKnT5fZ?si=apooDyKiSxGuMwKMnLJ18Q&nd=1'
        target='_blank'
        rel='noreferrer'
        className='inline-link'
      >
        <FaSpotify style={iconStyle} />
      </a>
    </footer>
  );
};

export default Footer;
