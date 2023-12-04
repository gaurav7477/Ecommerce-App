import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { Twitter, Instagram, LinkedIn } from "@material-ui/icons";
const About = () => {
  const SocialURL = {
    Twitter: "https://twitter.com/grub7477",
    Instagram: "https://instagram.com/grub_7477",
    Linkedin: "https://linkedin.com/in/gaurav-bairagi",
  };
  const visitSocial = (Social) => {
    window.location = SocialURL[Social];
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dmp7x6ttw/image/upload/v1701711915/o0mmblih5nfdchg5jowa.jpg"
              alt="Founder"
            />
            <Typography variant="h4">Gaurav Bairagi</Typography>
            <Button onClick={() => visitSocial("Linkedin")} color="primary">
              Visit Linkedin
            </Button>
            <Typography>
              Final-year CS student at IIIT Bhopal, highly committed, motivated,
              and a quick learner. Proficient in Data Structures and Algorithms
              (DSA) with hands-on experience in C/C++, JavaScript, React,
              Node.js, SQL and MongoDB. Eager to leverage technical expertise
              and problem-solving skills to drive for excellence.
            </Typography>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Socials</Typography>

            <a href={SocialURL["Twitter"]} target="blank">
              <Twitter />
            </a>
            <a href={SocialURL["Linkedin"]} target="blank">
              <LinkedIn />
            </a>
            <a href={SocialURL["Instagram"]} target="blank">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
