export function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Agent Kammer</h3>
              <p className="text-sm text-muted-foreground">
                Luxury NYC real estate at your fingertips
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Property Search</li>
                <li>Pre-Approval</li>
                <li>Home Valuation</li>
                <li>Market Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0a1628] py-3">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-white">
            🗽Copyright 2025 - Agent Kammer ® | Powered by Replit
          </p>
        </div>
      </div>
    </footer>
  );
}
