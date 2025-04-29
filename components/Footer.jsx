export default function Footer() {
    return (
      <footer className="text-center py-8 text-sm" style={{ color: "var(--foreground)" }}>
        © {new Date().getFullYear()} Casino 🎲 — All rights reserved.
      </footer>
    );
  }