import { FaFacebook, FaInstagram, FaGithub, FaDribbble } from "react-icons/fa";
import { FooterLink, IconLink } from "../ui/FooterLink";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#07152fc4] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <strong className="block text-center text-xl font-bold text-white sm:text-3xl">Still have some queries?</strong>

          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                {" "}
                Email{" "}
              </label>

              <input
                className="w-full rounded-full border-slate-600 bg-[#031533] p-4 pe-32 text-sm font-medium text-white placeholder:text-slate-300"
                id="email"
                type="search"
                placeholder="Type your question here..."
              />

              <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-400 cursor-pointer">
                Get in Touch
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-slate-700/50 pt-12 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-center text-slate-300 lg:text-left lg:text-lg">
              We are always open to discussing product improvements or partnerships. Feel free to reach out to us!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-white"> Events </strong>
              <ul className="mt-6 space-y-1">
                <li>
                  <FooterLink href="#">Explore Events</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Cultural Fest</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Technical Symposium</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Sports Meet</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-white"> Resources </strong>
              <ul className="mt-6 space-y-1">
                <li>
                  <FooterLink href="#">Organizer Handbook</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Student Guide</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Venue Booking</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Event Guidelines</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Safety Protocol</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-white"> Support </strong>
              <ul className="mt-6 space-y-1">
                <li>
                  <FooterLink href="#">Help Center</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">FAQ</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Report an Issue</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Contact Admin</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-700/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs/relaxed text-slate-300 sm:flex-row sm:text-left">
            <p>© Patan Multiple Campus EMS, 2026. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4">
              <IconLink href="https://www.facebook.com" label="Facebook">
                <FaFacebook className="size-5 text-white" />
              </IconLink>

              <IconLink href="https://www.instagram.com" label="Instagram">
                <FaInstagram className="size-5 text-white" />
              </IconLink>

              <IconLink href="https://x.com" label="Twitter">
                <FaXTwitter className="size-5 text-white" />
              </IconLink>

              <IconLink href="https://github.com/PSujit29/event-management-system-fe" label="GitHub">
                <FaGithub className="size-5 text-white" />
              </IconLink>

              <IconLink href="https://dribbble.com" label="Dribbble">
                <FaDribbble className="size-5 text-white" />
              </IconLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
