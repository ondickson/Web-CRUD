// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-circle">E</div>
            <div>
              <div className="footer-logo-text">Efie Now</div>
              <p>Your trusted partner for the best global stays.</p>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <a href="#">Destinations</a>
              <a href="#">Inspiration</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Efie Now. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
