import {FaGoogle, FaGithub, FaLinkedinIn} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-card">
      <a href="https://www.linkedin.com/in/lalithpraveen-kumar-0b2804117/">
        <FaGoogle className="footer-icon" />
      </a>
      <a href="https://github.com/lalithpraveen">
        <FaGithub className="footer-icon" />
      </a>

      <a href="https://www.linkedin.com/in/lalithpraveen-kumar-0b2804117/">
        <FaLinkedinIn className="footer-icon" />
      </a>
    </div>
    <p className="footer-contact">Created By </p>
    <p className="footer-contact">Praveen Kumar Yarlagadda </p>
  </div>
)

export default Footer
