import { useEffect, useState } from "react";

const STORAGE_KEY = "tiptop_cookie_consent";

type Consent = "accepted" | "rejected";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div>
        <strong>Cookies</strong>
        <p>
          Nous utilisons des cookies pour mesurer l'audience et améliorer l'expérience. Tu peux accepter ou refuser dès maintenant.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="tt-btn tt-btn-ghost" onClick={reject}>Refuser</button>
        <button className="tt-btn tt-btn-primary" onClick={accept}>Accepter</button>
      </div>
    </div>
  );
};

export default CookieBanner;