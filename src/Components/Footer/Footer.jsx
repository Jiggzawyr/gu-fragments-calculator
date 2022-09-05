import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <h2 id="contact" className="footer-title">Contact</h2>
            <ul className="contact-list">
                <li>
                    Tel:  +381 62 96 27 872
                </li>
                <li>
                    Email:  <a href = "mailto:martinstojanovic96@gmail.com?subject=GU Fragments Calculator">martinstojanovic96@gmail.com</a>
                </li>
                <li>
                    Instagram:  <a href="https://www.instagram.com/martin.the.mass/" target="_blank">martin.the.mass</a>
                </li>
            </ul>
        </div>
    );
}

