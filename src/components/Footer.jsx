import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span>© {new Date().getFullYear()} Rupali. Built with React.</span>
        <span className="site-footer__note">Sample content throughout — personalize before publishing.</span>
      </div>
    </footer>
  )
}
